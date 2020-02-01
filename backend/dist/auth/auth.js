"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const database_model_1 = require("../database/database.model");
class Auth {
    static init() {
        passport.use(new passport_local_1.Strategy(function (email, password, done) {
            database_model_1.User.findOne({ email }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                if (!bcrypt.compareSync(password, user.toObject().password)) {
                    return done(null, false);
                }
                const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
                return done(null, Object.assign(user, { token }));
            });
        }));
        passport.use(new passport_jwt_1.Strategy({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        }, function (jwt_payload, done) {
            database_model_1.User.findById(jwt_payload._id, function (err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                }
                else {
                    return done(null, false);
                    // or you could create a new account
                }
            });
        }));
        passport.serializeUser(function (user, done) {
            done(null, user._id);
        });
        passport.deserializeUser(function (id, done) {
            database_model_1.User.findById(id, function (err, user) {
                done(err, user);
            });
        });
    }
}
exports.default = Auth;
//# sourceMappingURL=auth.js.map