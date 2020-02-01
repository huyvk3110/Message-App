"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express = require("express");
const helmet = require("helmet");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportSocketIO = require("passport.socketio");
const socketio = require("socket.io");
const Http = require("http");
const connectMongo = require("connect-mongo");
const cors = require("cors");
const auth_1 = require("./auth/auth");
const socket_1 = require("./socket/socket");
const router_1 = require("./router/router");
const app = express();
const http = Http.createServer(app);
const io = socketio(http);
const cookieParser = require('cookie-parser');
const MongoStore = connectMongo(session);
const sessionStore = new MongoStore({
    mongooseConnection: mongoose.connection,
    autoReconnect: true
});
dotenv.config();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(process.cwd() + '/public'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    store: sessionStore
}));
app.use(passport.initialize());
app.use(passport.session());
auth_1.default.init();
app.use('/', router_1.default);
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
io.use(passportSocketIO.authorize({
    cookieParser: cookieParser,
    key: 'connect.sid',
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    success: (data, accept) => { console.log("Socket io session success"); accept(); },
    fail: (data, message, critical, accept) => { console.log("Socket io session fail", message); },
}));
const server = http.listen(process.env.PORT || 3001, function () {
    console.log(`Server start on port ${process.env.PORT}`);
});
socket_1.default(io);
//# sourceMappingURL=server.js.map