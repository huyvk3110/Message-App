import { Router } from "express";
import passport = require("passport");
import * as jwt from "jsonwebtoken";

const router = Router();

router.post('/login', passport.authenticate('local', { failureRedirect: '/', }), function (req: any, res) {
    res.status(200).json({
        authenticate: req.user.token,
        data: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
        }
    })
})

router.post('/login-jwt', passport.authenticate('jwt', { session: false, failureRedirect: '/', }), function (req: any, res) {
    res.status(200).json({
        authenticate: req.user.token,
        data: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
        }
    })
})

router.route('/register')
    .post(function (req, res) {

    })

router.route('/logout')
    .post(function (req, res) {
        req.logout();
        res.redirect('/');
    })

export default router;