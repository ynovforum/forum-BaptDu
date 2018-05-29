const {Question} = require('../../app/database/data');


exports.question_list = function (req, res) {

    Question
        .findAll()
        .then(Questions => res.json(Questions))
        .catch((error) => {
            res.render('500', {error: error});
        })

};

exports.question_create = function (req, res) {

    const title = req.body.title;
    const description = req.body.firstName;

    Question
        .sync()
        .then(function () {
            Question.create({
                title: title,
                description: description,
                userId: req.query.userId
            });
            res.redirect('/');
        })
        .catch((error) => {
            res.render('500', {error: error});
        })

};

exports.question_detail = function (req, res) {

    const id = req.params.questionId;

    Question
        .find({
            where: {id: id}
        })
        .then(Question => res.json(Question))
        .catch((error) => {
            res.render({error: error})
        })
};

exports.question_update = function (req, res) {

    const id = req.params.questionId;
    const updates = req.body.updates;

    Question
        .find({
            where: {id: id}
        })
        .then(User => {
            return User.updateAttributes(updates)
        })
        .then(updatedQuestion => {
            res.json(updatedQuestion);
        })
        .catch((error) => {
            res.render({error: error})
        })
};


exports.question_delete = function (req, res) {

    const id = req.params.questionId;

    Question
        .destroy({
            where: {id: id}
        })
        .then(deleteQuestion => {
            res.json(deleteQuestion);
        })
        .catch((error) => {
            res.render({error: error})
        })
};
