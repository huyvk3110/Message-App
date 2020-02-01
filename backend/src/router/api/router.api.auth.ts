import { Router } from "express";
import passport = require("passport");

const router = Router();

router.post('/login', passport.authenticate('local'), function (req: any, res) {
    if (req.isAuthenticated()) {
        res.status(200).json({
            status: 'success',
            authenticate: req.user.token,
            data: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
            }
        })
    } else {
        res.status(500).json({ status: 'error' })
    }
})

router.post('/login-jwt', passport.authenticate('jwt', { session: false }), function (req: any, res) {
    if (req.isAuthenticated()) {
        res.status(200).json({
            status: 'success',
            authenticate: req.user.token,
            data: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
            }
        })
    } else {
        res.status(500).json({ status: 'error' })
    }
})

router.route('/register')
    .post(function (req, res) {

    })

router.route('/logout')
    .post(function (req, res) {
        req.logout();
        res.status(200).json({ status: 'success' })
    })

export default router;