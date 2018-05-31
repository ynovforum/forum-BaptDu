const express = require('express');
const passport = require('passport');
const router = express.Router();

const AuthController = require('./AuthController');

router.route('/login')

    .get(AuthController.login)

    .post(passport.authenticate('local', {
        failureRedirect: '/',
        successRedirect: '/'
    }));

router.route('/logout')
    .get(AuthController.logout);



router.route('/register')

    .get(AuthController.register_get)

    .post(AuthController.register);


module.exports = router;