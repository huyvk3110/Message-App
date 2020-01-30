import * as passport from "passport"
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../database/database.model";

export default class Auth {
    public static init() {
        passport.use(new LocalStrategy(function (email, password, done) {
            User.findOne({ email }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                if (!bcrypt.compareSync(password, user.toObject().password)) { return done(null, false); }

                const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
                return done(null, Object.assign(user, { token }));
            })
        }))

        passport.use(new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: process.env.JWT_SECRET,
            },
            function (jwt_payload, done) {
                User.findById(jwt_payload._id, function (err, user) {
                    if (err) {
                        return done(err, false);
                    }
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                })
            }
        ))

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