"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const bcrypt = require("bcrypt");
const passport_local_1 = require("passport-local");
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
                return done(null, user);
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