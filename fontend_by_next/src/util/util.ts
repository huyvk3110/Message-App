import { Router, NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";

export async function isAuth(req: Request, res: Response, next: NextFunction) {
    try {
        console.log('1',req.headers.authorization)
        if (!req.headers.authorization) throw 'Authorization error';
        let key = req.headers.authorization.split(' ');
        console.log('2', req.session)
        if (!req.session.user) await new Promise((res, rej) => req.session.reload(res))
        console.log('3',key)
        if (key.length !== 2 || key[0] !== 'Bearer') throw 'Authorization error';
        let user: any = jwt.verify(key[1], process.env.JWT_SECRET);
        console.log('4', user, req.session)
        if (!user || !req.session.user || req.session.user._id !== user._id) throw 'Authorization error';
        req.session.user = user;
        req.session.save(() => { next() })
    } catch (error) {
        // return res.status(401).json({ status: 'Error', message: error });
        return res.redirect('/');
    }
}

export function checkPermission(permission: number) {
    return (req: any, res: Response, next: NextFunction) => {
        if (!req.session.user) return res.status(401).json("Authenticate error");
        if (req.session.user.permission !== permission) return res.status(500).json("Error");
        next();
    }
}