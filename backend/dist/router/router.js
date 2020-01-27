"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router_api_users_1 = require("./api/router.api.users");
const router_api_auth_1 = require("./api/router.api.auth");
const router = express_1.Router();
function isAuth(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
router.use('/api/auth', router_api_auth_1.default);
router.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/index.html');
});
router.get('/profile', isAuth, function (req, res) {
    res.sendFile(process.cwd() + '/public/profile.html');
});
router.use('/api/users', isAuth, router_api_users_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map