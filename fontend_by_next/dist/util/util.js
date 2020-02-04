"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
async function isAuth(req, res, next) {
    try {
        console.log('1', req.headers.authorization);
        if (!req.headers.authorization)
            throw 'Authorization error';
        let key = req.headers.authorization.split(' ');
        console.log('2', req.session);
        if (!req.session.user)
            await new Promise((res, rej) => req.session.reload(res));
        console.log('3', key);
        if (key.length !== 2 || key[0] !== 'Bearer')
            throw 'Authorization error';
        let user = jwt.verify(key[1], process.env.JWT_SECRET);
        console.log('4', user, req.session);
        if (!user || !req.session.user || req.session.user._id !== user._id)
            throw 'Authorization error';
        req.session.user = user;
        req.session.save(() => { next(); });
    }
    catch (error) {
        // return res.status(401).json({ status: 'Error', message: error });
        return res.redirect('/');
    }
}
exports.isAuth = isAuth;
function checkPermission(permission) {
    return (req, res, next) => {
        if (!req.session.user)
            return res.status(401).json("Authenticate error");
        if (req.session.user.permission !== permission)
            return res.status(500).json("Error");
        next();
    };
}
exports.checkPermission = checkPermission;
