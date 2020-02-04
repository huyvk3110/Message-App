"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pubsub_js_1 = require("pubsub-js");
const define_key_1 = require("../define/define.key");
const database_model_1 = require("../database/database.model");
function default_1(io) {
    let userOnline = 0;
    io.on('connection', async function (socket) {
        console.log('A user has connected', socket.request.user.email, socket.id);
        pubsub_js_1.publish(define_key_1.PUBSUB.USER_ONLINE, { io, userOnline: ++userOnline });
        socket.on('disconnect', function (data) {
            pubsub_js_1.publish(define_key_1.PUBSUB.USER_ONLINE, { io, userOnline: --userOnline });
        });
        //Cache socket id in user database
        await new Promise((res, rej) => database_model_1.User.findByIdAndUpdate(socket.request.user._id, { socket_id: socket.id }).then(data => res()));
        //Emit
        (async () => {
            const id = socket.request.user.id;
            //User chatroom list id
            let listId = await new Promise((res, rej) => database_model_1.User.findById(id).then((data) => res(data.chatrooms)));
            listId.map((o) => o._id);
            //Get list chatroom
            let listChatRoom = await new Promise((res, rej) => database_model_1.ChatRoom.find({ _id: { $in: listId } }).then(data => res(data)));
            socket.emit(define_key_1.IO.CHATROOM_LIST, listChatRoom);
        })();
        //Listent
        socket.on(define_key_1.IO.MESSAGE, async function (data) {
            let { friendEmail, chatroomId, text } = data;
            let chatroom = undefined;
            let me = undefined;
            let friend = undefined;
            const id = socket.request.user.id;
            if ((!chatroomId && !friendEmail) || (chatroomId && friendEmail))
                return;
            //Get me
            me = await new Promise((res, rej) => database_model_1.User.findById(id).then((data) => res(data)));
            //Get friend
            if (friendEmail)
                friend = await new Promise((res, rej) => database_model_1.User.findOne({ email: friendEmail }).then(data => res(data)));
            //Get chat room
            if (chatroomId) {
                //Get chatroom
                chatroom = await new Promise((res, rej) => { database_model_1.ChatRoom.findById(chatroomId).then(data => res(data)); });
                //Get friend if friend id not exist
                let friendId = chatroom.users.find((o) => o != id);
                friend = await new Promise((res, rej) => database_model_1.User.findById(friendId).then(data => res(data)));
            }
            //Check user exist
            if (!me || !friend)
                return;
            if (friendEmail && !chatroom) {
                //Check friend id on chat room
                const listChatrooms = await new Promise((res, rej) => database_model_1.User.findById(id).then(data => res(data.get('chatrooms'))));
                let chatroomId = listChatrooms.find((o) => o && o.users.find((oo) => oo == friend._id));
                //Check chatroom and create if not exist
                if (chatroomId)
                    chatroom = await new Promise((res, rej) => { database_model_1.ChatRoom.findById(chatroomId).then(data => res(data)); });
                else {
                    //Create chatroom
                    chatroom = await new Promise((res, rej) => {
                        let chatroom = new database_model_1.ChatRoom({
                            created_at: new Date(),
                            updated_at: new Date(),
                            users: [id, friend._id]
                        });
                        chatroom.save().then(data => res(data));
                    });
                    //Update friend
                    friend.chatrooms.push(chatroom);
                    await new Promise((res, rej) => friend.save().then(() => res()));
                    //Update user data
                    me.chatrooms.push(chatroom);
                    await new Promise((res, rej) => me.save().then(() => res()));
                }
            }
            if (!chatroom)
                return;
            //Create message
            let message = new database_model_1.Message({
                user_id: id,
                message: text,
                created_at: new Date(),
                chatroom_id: chatroom._id,
            });
            await new Promise((res, rej) => message.save().then(() => res()));
            //Update chatroom data
            chatroom.updated_at = new Date();
            chatroom.last_message = message;
            await new Promise((res, rej) => chatroom.save().then(() => res()));
            //Socket emit
            //-Emit me
            socket.emit(define_key_1.IO.MESSAGE, message);
            //-Emit friend
            if (friend && friend.socket_id)
                io.to(friend.socket_id).emit(define_key_1.IO.MESSAGE, message);
        });
    });
    pubsub_js_1.subscribe(define_key_1.PUBSUB.USER_ONLINE, (message, data) => {
        const { io, userOnline } = data;
        console.log(`SocketIO: ${userOnline} users are online`);
        io.emit(define_key_1.IO.USER_ONLINE, userOnline);
    });
}
exports.default = default_1;
