const express = require('express');
const router = express.Router();


const auth_controller = require('./AuthController');

router.route('/register')
    .post(auth_controller.auth_signup);

router.route('/login')
    .post(auth_controller.auth_login);

router.route('/logout')
    .all(auth_controller.auth_logout);

module.exports = router;