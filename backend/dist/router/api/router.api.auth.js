"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport = require("passport");
const router = express_1.Router();
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/profile'
}));
router.route('/register')
    .post(function (req, res) {
});
router.route('/logout')
    .post(function (req, res) {
});
exports.default = router;
//# sourceMappingURL=router.api.auth.js.map