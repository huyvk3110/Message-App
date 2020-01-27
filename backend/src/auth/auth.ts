import * as passport from "passport"
import * as bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../database/database.model";

export default class Auth {
    public static init() {
        passport.use(new LocalStrategy(function (email, password, done) {
            User.findOne({ email }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                if (!bcrypt.compareSync(password, user.toObject().password)) { return done(null, false); }
                return done(null, user);
            })
        }))

        passport.serializeUser(function (user: any, done: (error: any, data: any) => void) {
            done(null, user._id);
        })

        passport.deserializeUser(function (id: any, done: (error: any, data: any) => void) {
            User.findById(id, function (err, user) {
                done(err, user);
            })
        })
    }
}