// src/server.ts
import * as express from "express";
import * as helmet from "helmet";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as mongoose from "mongoose";
import * as session from "express-session";
import * as passport from "passport";
import * as passportSocketIO from "passport.socketio";
import * as socketio from "socket.io";
import * as Http from "http";
import * as connectMongo from "connect-mongo";
import * as cors from "cors";
import auth from "./auth/auth";
import socketServer from "./socket/socket";
import router from "./router/router";

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
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(process.cwd() + '/public'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  store: sessionStore
}));
app.use(passport.initialize());
app.use(passport.session());
auth.init();
app.use('/', router);
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

io.use(passportSocketIO.authorize({
  cookieParser: cookieParser,
  key: 'connect.sid',
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  success: (data, accept) => { console.log("Socket io session success"); accept() },
  fail: (data, message, critical, accept) => { console.log("Socket io session fail", message) },
}))

const server = http.listen(process.env.PORT || 3001, function () {
  console.log(`Server start on port ${process.env.PORT}`);
});

socketServer(io);