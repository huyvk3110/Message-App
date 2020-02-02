import { Router, Request, Response, NextFunction } from "express";
import { User } from "../../database/database.model";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { isAuth } from "../../util/util";

const router = Router();

router.post('/login', function (req: Request, res: Response) {
    const { username, password } = req.body;

    User.findOne({ email: username }, function (err: any, user: any) {
        if (err) { return res.status(401).json({ status: "error", message: err }); }
        if (!user || !bcrypt.compareSync(password, user.toObject().password)) { return res.status(401).json({ message: "Authorization error" }); }

        const expiresIn = new Date().getTime() + 24 * 60 * 60 * 1000;
        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn });
        req.session.user = user;
        req.headers.authorization = `Bearer ${token}`

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
            })
        })
    })
})

router.post('/login-jwt', isAuth, function (req: Request, res: Response) {
    const user = req.session.user;
    res.status(200).json({
        status: 'success',
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
        }
    })
})

router.route('/register')
    .post(function (req, res) {

    })

router.route('/logout')
    .post(function (req, res) {
        req.session.destroy(() => {
            res.status(200).json({ status: 'success' })
        })
    })

export default router;