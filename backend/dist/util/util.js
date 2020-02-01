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
const passport = require("passport");
function isAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        passport.authenticate('jwt', { session: false })(req, res, () => {
            if (req.isAuthenticated())
                return next();
            res.status(401).json({ status: 'Authorization error' });
        });
    });
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