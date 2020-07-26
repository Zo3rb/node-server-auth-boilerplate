const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const localStrategy = require('passport-local');

// Creating "Email, Password" Login Strategy
const localOptions = {
    usernameField: "email"
}
const localLogin = new localStrategy(localOptions, (email, password, done) => {
    User.findOne({ email }, (error, user) => {
        if (error) done(error, false);
        if (!user) done(null, false);
        user.comparePassword(password, function (err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false); }

            return done(null, user);
        });
    });
});

// Creating "loginStrategy of JWT"
const jwtOptions = {
    jwtFromRequest: extractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET
}
const jwtLogin = new jwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.sub, (error, user) => {
        if (error) done(error, false);
        if (user) done(null, user);
        done(null, false);
    });
});

passport.use(jwtLogin);
passport.use(localLogin);
