"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
function isAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('1', req.headers.authorization);
            if (!req.headers.authorization)
                throw 'Authorization error';
            let key = req.headers.authorization.split(' ');
            console.log('2', req.session);
            if (!req.session.user)
                yield new Promise((res, rej) => req.session.reload(res));
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
            return res.status(401).json({ status: 'Error', message: error });
        }
    });
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
//# sourceMappingURL=util.js.map