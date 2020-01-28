"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_api_users_1 = require("./api/router.api.users");
const router_api_auth_1 = require("./api/router.api.auth");
const router_api_account_1 = require("./api/router.api.account");
const express_1 = require("express");
const define_permission_1 = require("../define/define.permission");
const util_1 = require("../util/util");
const router = express_1.Router();
router.get('/', function (req, res) { res.sendFile(process.cwd() + '/public/index.html'); });
router.use('/api/auth', router_api_auth_1.default);
router.use('/api/account', router_api_account_1.default);
router.get('/chat', util_1.isAuth, function (req, res) { res.sendFile(process.cwd() + '/public/chat.html'); });
router.use('/api/users', util_1.isAuth, util_1.checkPermission(define_permission_1.ADMIN), router_api_users_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map