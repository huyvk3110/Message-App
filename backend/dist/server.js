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
const cookieParser = require("cookie-parser");
const auth_1 = require("./auth/auth");
const router_1 = require("./router/router");
const app = express();
const http = require("http").Server(app);
dotenv.config();
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(process.cwd() + '/public'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());
auth_1.default.init();
app.use('/', router_1.default);
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const server = http.listen(process.env.PORT || 3001, function () {
    console.log(`Server start on port ${process.env.PORT}`);
});
//# sourceMappingURL=server.js.map