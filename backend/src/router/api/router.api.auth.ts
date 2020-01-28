import { Router } from "express";
import passport = require("passport");

const router = Router();

router.post('/login', passport.authenticate('local', { failureRedirect: '/', }), function (req: any, res) {
    res.status(200).json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
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