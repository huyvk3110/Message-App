import { Router, NextFunction, Response, Request } from "express";

export function isAuth(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
}

export function checkPermission(permission: number) {
    return (req: any, res: Response, next: NextFunction) => {
        if (!req.user) return res.status(401).json("Authenticate error");
        if (req.user.permission !== permission) return res.status(500).json("Error");
        next();
    }
}