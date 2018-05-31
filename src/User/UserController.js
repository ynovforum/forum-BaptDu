const {User, Question} = require('../../app/database/data');

/*
*  Code d'affichage des users [FindAll]
* --------------------------------------------------
* */

exports.user_list = function (req, res) {

    User
        .findAll({
            include: [Question]
        })
        .then((user) => {
            res.render('admin/userList', {user})
        })
};

/*
*  Code de mise à jour d'une user [Update]
* --------------------------------------------------
* */

exports.user_update_get = function (req, res) {


    User
        .findOne({
            where: {
                id: req.params.userId
            }
        })
        .then((user) => {
            res.render('admin/userEdit', {user})
        })
};


exports.user_update_patch = function (req, res) {

    const name = req.body.name;
    const email = req.body.email;
    const bio = req.body.bio;
    const picture = req.body.picture;

    User
        .update({name: name, email: email,bio: bio, picture: picture},
            {where: {id: req.params.userId}}
        ).then(() => {
        res.redirect('/');
    });
}
;

/*
*  Code de suppretion d'une user [Deleted]
* --------------------------------------------------
* */

exports.user_delete_get = function (req, res) {

    User
        .findOne({
            where: {
                id: req.params.userId
            }
        })
        .then(() => {
            res.redirect('/');
        });
};

exports.user_delete = function (req, res) {

    User
        .destroy({
            where: {id: req.params.userId}
        })
        .then(() => {
            res.redirect('/');
        });
};
