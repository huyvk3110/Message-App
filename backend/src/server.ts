// src/server.ts
import * as express from "express";
import * as helmet from "helmet";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as mongoose from "mongoose";
import * as session from "express-session";
import * as passport from "passport";
import * as cookieParser from "cookie-parser";
import auth from "./auth/auth";
import router from "./router/router";

const app = express();
const http = require("http").Server(app);

dotenv.config();
app.use(helmet());
app.use(morgan("dev"))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(process.cwd() + '/public'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());
auth.init();
app.use('/', router);
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const server = http.listen(process.env.PORT || 3001, function () {
  console.log(`Server start on port ${process.env.PORT}`);
});
