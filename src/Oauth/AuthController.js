const {User} = require('../../database/data');


exports.register = function (req, res) {

    const bio = req.body.bio;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const picture = req.body.picture;
    const password = req.body.password;

    User
        .sync()
        .then(function () {
            User.create({
                firstName: firstName,
                lastName: lastName,
                bio: bio,
                email: email,
                picture: picture,
                password: password
            });
            res.redirect('/login');
        })
        .catch((error) => {
            res.render('500', {error: error});
        })

};
