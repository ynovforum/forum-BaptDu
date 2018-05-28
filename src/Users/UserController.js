const {Users} = require('../../database/data');

exports.user_detail = function (req, res) {

    const id = req.params.userId;

    Users
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

    Users
        .find({
            where: {id: id}
        })
        .then(User => {
            return User.updateAttributes(updates)
        })
        .then(updatedFormation => {
            res.json(updatedFormation);
        })
        .catch((error) => {
            res.render({error: error})
        })
};


exports.user_delete = function (req, res) {

    const id = req.params.userId;

    Users
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
