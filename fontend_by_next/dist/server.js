"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router/router"));
const dev = process.env.NODE_ENV !== 'production';
const next = next_1.default({ dev });
const handle = next.getRequestHandler();
(async () => {
    await next.prepare();
    const app = express_1.default();
    const http = http_1.default.createServer(app);
    const io = socket_io_1.default(http);
    const cookieParser = require('cookie-parser');
    const MongoStore = connect_mongo_1.default(express_session_1.default);
    const sessionStore = new MongoStore({
        mongooseConnection: mongoose_1.default.connection,
        autoReconnect: true
    });
    dotenv_1.default.config();
    app.use(helmet_1.default());
    app.use(cors_1.default());
    app.use(morgan_1.default("dev"));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(body_parser_1.default.json());
    app.use(express_session_1.default({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60 * 60 * 1000, expires: new Date(Date.now() + 60 * 60 * 1000), secure: true },
        store: sessionStore
    }));
    mongoose_1.default.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    app.use('/', router_1.default);
    app.get('*', function (req, res) {
        handle(req, res);
    });
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
})();
