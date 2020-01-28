import routerUser from "./api/router.api.users";
import routerAuth from "./api/router.api.auth";
import routerAccount from "./api/router.api.account";
import { Router, NextFunction, Response, Request } from "express";
import { ADMIN } from "../define/define.permission";
import { isAuth, checkPermission } from "../util/util";

const router = Router();

router.get('/', function (req, res) { res.sendFile(process.cwd() + '/public/index.html') });

router.use('/api/auth', routerAuth);

router.use('/api/account', routerAccount);

router.get('/chat', isAuth, function (req, res) { res.sendFile(process.cwd() + '/public/chat.html') });

router.use('/api/users', isAuth, checkPermission(ADMIN), routerUser);

export default router;