import { Server, Socket } from "socket.io";
import { publish, subscribe } from "pubsub-js";
import { PUBSUB, IO } from "../define/define.key";
import { ChatRoom, User, Message } from "../database/database.model";

export default function (io: Server) {
    let userOnline = 0;

    io.on('connection', async function (socket: Socket) {
        console.log('A user has connected', socket.request.user.email, socket.id);
        publish(PUBSUB.USER_ONLINE, { io, userOnline: ++userOnline });

        socket.on('disconnect', function (data) {
            publish(PUBSUB.USER_ONLINE, { io, userOnline: --userOnline });
        })

        //Cache socket id in user database
        await new Promise((res, rej) => User.findByIdAndUpdate(socket.request.user._id, { socket_id: socket.id }).then(data => res()));

        //Emit
        (async () => {
            const id = socket.request.user.id;
            //User chatroom list id
            let listId: Object[] = await new Promise((res, rej) => User.findById(id).then((data: any) => res(data.chatrooms)))
            listId.map((o: any) => o._id)
            //Get list chatroom
            let listChatRoom = await new Promise((res, rej) => ChatRoom.find({ _id: { $in: listId } }).then(data => res(data)));

            socket.emit(IO.CHATROOM_LIST, listChatRoom);
        })()

        //Listent
        socket.on(IO.MESSAGE, async function (data: any) {
            let { friendId, chatroomId, text } = data;
            let chatroom: any = undefined;
            let me: any = undefined;
            let friend: any = undefined;
            const id = socket.request.user.id;

            if ((!chatroomId && !friendId) || (chatroomId && friendId)) return;
            //Get me
            me = await new Promise((res, rej) => User.findById(id).then((data) => res(data)));
            //Get friend
            if (friendId) friend = await new Promise((res, rej) => User.findById(friendId).then(data => res(data)));
            //Get chat room
            if (chatroomId) {
                //Get chatroom
                chatroom = await new Promise((res, rej) => { ChatRoom.findById(chatroomId).then(data => res(data)) });
                //Get friend if friend id not exist
                friendId = chatroom.users.find((o: any) => o != id);
                friend = await new Promise((res, rej) => User.findById(friendId).then(data => res(data)));
            }
            //Check user exist
            if (!me || !friend) return;

            if (friendId && !chatroom) {
                //Check friend id on chat room
                const listChatrooms: Object[] = await new Promise((res, rej) => User.findById(id).then(data => res(data.get('chatrooms'))));
                let chatroomId = listChatrooms.find((o: any) => o && o.users.find((oo: any) => oo == friendId));
                //Check chatroom and create if not exist
                if (chatroomId) chatroom = await new Promise((res, rej) => { ChatRoom.findById(chatroomId).then(data => res(data)) });
                else {
                    //Create chatroom
                    chatroom = await new Promise((res, rej) => {
                        let chatroom = new ChatRoom({
                            created_at: new Date(),
                            updated_at: new Date(),
                            users: [id, friendId]
                        })
                        chatroom.save().then(data => res(data))
                    })
                    //Update friend
                    friend.chatrooms.push(chatroom);
                    await new Promise((res, rej) => friend.save().then(() => res()));
                    //Update user data
                    me.chatrooms.push(chatroom);
                    await new Promise((res, rej) => me.save().then(() => res()));
                }
            }
            if (!chatroom) return;

            //Create message
            let message = new Message({
                user_id: id,
                message: text,
                created_at: new Date(),
                chatroom_id: chatroom._id,
            })
            await new Promise((res, rej) => message.save().then(() => res()));

            //Update chatroom data
            chatroom.updated_at = new Date();
            chatroom.last_message = message;
            await new Promise((res, rej) => chatroom.save().then(() => res()));

            //Socket emit
            //-Emit me
            socket.emit(IO.MESSAGE, message);
            //-Emit friend
            if (friend && friend.socket_id) io.to(friend.socket_id).emit(IO.MESSAGE, message);
        })
    });

    subscribe(PUBSUB.USER_ONLINE, (message: string, data: { io: Server, userOnline: number }) => {
        const { io, userOnline } = data;
        console.log(`SocketIO: ${userOnline} users are online`);
        io.emit(IO.USER_ONLINE, userOnline);
    })
}
