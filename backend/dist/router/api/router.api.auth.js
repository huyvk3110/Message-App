"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport = require("passport");
const router = express_1.Router();
router.post('/login', passport.authenticate('local', { failureRedirect: '/', }), function (req, res) {
    res.status(200).json({
        authenticate: req.user.token,
        data: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
        }
    });
});
router.post('/login-jwt', passport.authenticate('jwt', { session: false, failureRedirect: '/', }), function (req, res) {
    res.status(200).json({
        authenticate: req.user.token,
        data: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
        }
    });
});
router.route('/register')
    .post(function (req, res) {
});
router.route('/logout')
    .post(function (req, res) {
    req.logout();
    res.redirect('/');
});
exports.default = router;
//# sourceMappingURL=router.api.auth.js.map