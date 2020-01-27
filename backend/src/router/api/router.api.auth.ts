import { Router } from "express";
import passport = require("passport");

const router = Router();

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/profile'
}))

router.route('/register')
    .post(function (req, res) {

    })

router.route('/logout')
    .post(function (req, res) {

    })

export default router;