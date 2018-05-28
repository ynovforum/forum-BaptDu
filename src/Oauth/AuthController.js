const {Users} = require('../../database/data');
const {JWT_TOKEN} = require('../../config/tsconfig');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.auth_signup = function (req, res) {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    Users
        .find({
            where: {email}
        })
        .then(user => {
            if (user) {
                return res.status(409).json({
                    message: 'Email exist'
                })
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        Users
                            .create({
                                username: username,
                                email: email,
                                password: hash

                            })
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User Created'
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                })

            }
        });
};

exports.auth_login = function (req, res) {

    const email = req.body.email;
    const password = req.body.password;

    Users
        .find({
            where: {email}
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Auth failed Email'
                });
            } else {
                const userPass = user.password;

                bcrypt.compare(password, userPass, (err, result) => {
                    if (result) {
                        const secret = jwt.sign({
                            email: user.email,
                            role: user.role,
                            userId: user.id,
                        }, JWT_TOKEN, {
                            expiresIn: "1h"
                        });
                        return res.status(200).json({
                            message: 'Auth successful',
                            token: secret
                        })
                    } else {
                        return res.status(401).json({
                            message: 'Auth failed'
                        });
                    }
                });
            }
        })
};

exports.auth_logout = function (req, res) {
    delete req.session.user; // any of these works
    req.session.destroy(); // any of these works
    res.status(200).send('logout successful')

};