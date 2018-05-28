const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {User} = require('../database/data');

passport.use('local', new LocalStrategy(
    function (username, password, done) {
        User.findOne({
            where:
                {
                    username: username
                }
        })
            .then(function (user) {
                if (!user) {
                    return done(null, false, {message: 'Incorrect username.'});
                }
                return done(null, user);
            })
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    User.findById(id)
        .then(function (user) {
            cb(null, user);
        });
});