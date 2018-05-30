const express = require('express');
const passport = require('passport');
const router = express.Router();

const AuthController = require('./AuthController');

router.route('/login')
    .post(passport.authenticate('local', {
        failureRedirect: '/',
        successRedirect: '/'
    }));

router.route('/register')
    .post(AuthController.register);


module.exports = router;