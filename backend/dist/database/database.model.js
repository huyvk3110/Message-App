"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schemaUser = new mongoose_1.Schema({
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
});
const schemaChatRoom = new mongoose_1.Schema({
    created_at: Date,
    updated_at: Date,
    users: [String],
    last_message: Object,
});
const schemaMessage = new mongoose_1.Schema({
    user_id: { type: String, required: true },
    message: { type: String, required: true },
    created_at: Date,
    chatroom_id: { type: String, required: true },
});
exports.User = mongoose_1.model('User', schemaUser, 'users');
exports.ChatRoom = mongoose_1.model('ChatRoom', schemaChatRoom, 'chatrooms');
exports.Message = mongoose_1.model('Message', schemaMessage, 'messages');
//# sourceMappingURL=database.model.js.map