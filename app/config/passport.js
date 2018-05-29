const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {User} = require('../database/data');

passport.use(new LocalStrategy((email, password, done) => {
    User
        .findOne({where: {email}})
        .then(function (user) {
            if (user) {
                bcrypt.compare(password, user.password, function (err, res) {
                    if (res === true) {
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: 'Invalid credentials'
                        });
                    }
                });

            } else {
                return done(null, false, {
                    message: 'Invalid credentials'
                });
            }
        })
        // If an error occured, report it
        .catch(done);
}));

passport.serializeUser((user, cb) => {
    cb(null, user.email);
});
passport.deserializeUser((email, cb) => {
    // Get a user from a cookie's content: his email
    User
        .findOne({where: {email}})
        .then((user) => {
            cb(null, user);
        })
        .catch(cb);
});