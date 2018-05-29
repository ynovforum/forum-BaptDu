const {User} = require('../../app/database/data');


exports.users_create = function (req, res) {

    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const picture = req.body.picture;
    const password = req.body.password;

    User
        .sync()
        .then(function () {
            User.create({
                username: username,
                firstName: firstName,
                lastName: lastName,
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

exports.user_detail = function (req, res) {

    const id = req.params.userId;

    User
        .find({
            where: {id: id}
        })
        .then(User => res.json(User))
        .catch((error) => {
            res.render({error: error})
        })
};

exports.user_update = function (req, res) {

    const id = req.params.userId;
    const updates = req.body.updates;

    User
        .find({
            where: {id: id}
        })
        .then(User => {
            return User.updateAttributes(updates)
        })
        .then(updatedUser => {
            res.json(updatedUser);
        })
        .catch((error) => {
            res.render({error: error})
        })
};


exports.user_delete = function (req, res) {

    const id = req.params.formationId;

    Formations
        .destroy({
            where: {id: id}
        })
        .then(deleteFormation => {
            res.json(deleteFormation);
        })
        .catch((error) => {
            res.render({error: error})
        })
};
