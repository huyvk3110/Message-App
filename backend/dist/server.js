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
const socketio = require("socket.io");
const Http = require("http");
const connectMongo = require("connect-mongo");
const cors = require("cors");
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
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.static(process.cwd() + '/public'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000, expires: new Date(Date.now() + 60 * 60 * 1000), secure: true },
    store: sessionStore
}));
app.use('/', router_1.default);
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
// io.use(passportSocketIO.authorize({
//   cookieParser: cookieParser,
//   key: 'connect.sid',
//   secret: process.env.SESSION_SECRET,
//   store: sessionStore,
//   passport,
//   success: (data, accept) => { console.log("Socket io session success"); accept(null, true) },
//   fail: (data, message, error, accept) => {
//     console.log("Socket io session fail", message);
//     if (error) return accept(error, false);
//     accept(null, false)
//   },
// }))
const server = http.listen(process.env.PORT || 3001, function () {
    console.log(`Server start on port ${process.env.PORT}`);
});
// socketServer(io);
//# sourceMappingURL=server.js.map