import express from "express";
import nextjs from "next";
import helmet from "helmet";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import session from "express-session";
import socketio from "socket.io";
import Http from "http";
import connectMongo from "connect-mongo";
import cors from "cors";
import socketServer from "./socket/socket";
import router from "./router/router";

const dev = process.env.NODE_ENV !== 'production';
const next = nextjs({ dev });
const handle = next.getRequestHandler();

(async () => {
    await next.prepare();

    const app = express();
    const http = Http.createServer(app);
    const io = socketio(http);
    const cookieParser = require('cookie-parser');
    const MongoStore = connectMongo(session);
    const sessionStore = new MongoStore({
        mongooseConnection: mongoose.connection,
        autoReconnect: true
    })

    dotenv.config();
    app.use(helmet());
    app.use(cors());
    app.use(morgan("dev"))
    app.use(cookieParser(process.env.SESSION_SECRET))
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60 * 60 * 1000, expires: new Date(Date.now() + 60 * 60 * 1000), secure: true },
        store: sessionStore
    }));
    mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

    app.use('/', router);
    app.get('*', function (req, res) {
        handle(req, res);
    })

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
})()