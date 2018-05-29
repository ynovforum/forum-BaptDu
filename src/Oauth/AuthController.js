const {User} = require('../../app/database/data');
const bcrypt = require('bcrypt');


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
                res.redirect('/login');
            })
            .catch((error) => {
                res.render('500', {error: error});
            })
    })


};
