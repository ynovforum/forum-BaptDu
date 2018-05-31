const {User} = require('../../app/database/data');
const bcrypt = require('bcrypt');





/*
*  Code d'inscription d'un utilisateur [RUser]
* --------------------------------------------------
* */

exports.register_get = function (req, res) {

    res.render('oauth/register', {user: req.user})
};

exports.register = function (req, res) {

    const bio = req.body.bio;
    const name = req.body.name;
    const email = req.body.email;
    const picture = req.body.picture;

    bcrypt.hash(req.body.password, 10, function (err, hash) {
        User
            .sync()
            .then(function () {
                User.create({
                    name: name,
                    bio: bio,
                    email: email,
                    picture: picture,
                    password: hash
                });
                res.redirect('/');
            })
            .catch((error) => {
                res.render('500', {error: error});
            })
    })


};

/*
*  Code d'affichage du login question [LUser]
* --------------------------------------------------
* */
exports.login = function (req, res) {
    res.render('oauth/login', {user: req.user})
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

