"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_model_1 = require("../../database/database.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const util_1 = require("../../util/util");
const router = express_1.Router();
router.post('/login', function (req, res) {
    const { username, password } = req.body;
    database_model_1.User.findOne({ email: username }, function (err, user) {
        if (err) {
            return res.status(401).json({ status: "error", message: err });
        }
        if (!user || !bcrypt.compareSync(password, user.toObject().password)) {
            return res.status(401).json({ message: "Authorization error" });
        }
        const expiresIn = new Date().getTime() + 24 * 60 * 60 * 1000;
        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn });
        req.session.user = user;
        req.headers.authorization = `Bearer ${token}`;
        req.session.save(() => {
            res.status(200).json({
                status: 'success',
                authenticate: token,
                expiresIn,
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                }
            });
        });
    });
});
router.post('/login-jwt', util_1.isAuth, function (req, res) {
    const user = req.session.user;
    res.status(200).json({
        status: 'success',
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    });
});
router.route('/register')
    .post(function (req, res) {
});
router.route('/logout')
    .post(function (req, res) {
    req.session.destroy(() => {
        res.status(200).json({ status: 'success' });
    });
});
exports.default = router;
//# sourceMappingURL=router.api.auth.js.map