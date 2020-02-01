import { Router, NextFunction, Response, Request } from "express";
import * as passport from "passport"

export async function isAuth(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', { session: false })(req, res, () => {
        if (req.isAuthenticated()) return next();
        res.status(401).json({ status: 'Authorization error' })
    })
}

export function checkPermission(permission: number) {
    return (req: any, res: Response, next: NextFunction) => {
        if (!req.user) return res.status(401).json("Authenticate error");
        if (req.user.permission !== permission) return res.status(500).json("Error");
        next();
    }
}