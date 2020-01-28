"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isAuth(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
exports.isAuth = isAuth;
function checkPermission(permission) {
    return (req, res, next) => {
        if (!req.user)
            return res.status(401).json("Authenticate error");
        if (req.user.permission !== permission)
            return res.status(500).json("Error");
        next();
    };
}
exports.checkPermission = checkPermission;
//# sourceMappingURL=util.js.map