import { Schema, model } from "mongoose";

const schemaUser = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: Date,
    last_login: Date,
    login_count: Number,
    permission: { type: Number, required: true },
    chatrooms: [Object],
    socket_id: String,
    online: Boolean,
})

const schemaChatRoom = new Schema({
    created_at: Date,
    updated_at: Date,
    users: [String],
    last_message: Object,
})

const schemaMessage = new Schema({
    user_id: { type: String, required: true },
    message: { type: String, required: true },
    created_at: Date,
    chatroom_id: { type: String, required: true },
})

export const User = model('User', schemaUser, 'users');
export const ChatRoom = model('ChatRoom', schemaChatRoom, 'chatrooms');
export const Message = model('Message', schemaMessage, 'messages');