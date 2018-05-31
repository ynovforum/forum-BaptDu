const {Question, User, Comment} = require('../../app/database/data');

/*
*  Code d'affichage des questions [FindAll]
* --------------------------------------------------
* */

exports.question_list = function (req, res) {

    Question
        .findAll()
        .then((question) => {
            res.render('home', {question, user: req.user})
        })
};

/*
*  Code de création d'une question [Create]
* --------------------------------------------------
* */

exports.question_create_get = function (req, res) {

    res.render('ticket/ticketAdd', {user: req.user})

};

exports.question_create_post = function (req, res) {

    const title = req.body.title;
    const content = req.body.content;

    Question
        .sync()
        .then(function () {
            Question.create({
                title: title,
                content: content,
                user_id: req.user.id
            });
            res.redirect('/');
        })
        .catch((error) => {
            res.render('500', {error: error});
            console.log(error)
        })

};

/*
*  Code d'affichage d'une question [FindId]
* --------------------------------------------------
* */

exports.question_detail_get = function (req, res) {

    Question
        .sync()
        .then(() => {
            return Question.find({
                where: {
                    id: req.params.questionId
                }, include: [
                    User,
                    {model: Comment, include:User}
                ]
            });
        })
        .then((question) => {
            res.render('ticket/ticket', {question, user: req.user});
        })
};


/*
*  Code de création d'un commentaire [CreateComment]
* --------------------------------------------------
* */

exports.question_comment_create_post = function (req, res) {

    const content = req.body.content;

    Comment
        .sync()
        .then(function () {
            Comment.create({
                content: content,
                user_id: req.user.id
            });
            res.redirect('/');
        })
        .catch((error) => {
            res.render('500', {error: error});
            console.log(error)
        })

};

/*
*  Code de mise à jour d'une question [Update]
* --------------------------------------------------
* */

exports.question_update_get = function (req, res) {


    Question
        .findOne({
            where: {
                id: req.params.questionId
            }
        })
        .then((question) => {
            res.render('ticket/ticketEdit', {question, user: req.user})
        })
};


exports.question_update_patch = function (req, res) {

    const title = req.body.title;
    const content = req.body.content;
    const resolvedAt = req.body.resolvedAt;

    Question
        .update({content: content, title: title,resolvedAt: resolvedAt, user_id: req.user.id},
            {where: {id: req.params.questionId}}
        ).then(() => {
        res.redirect('/');
    });
}
;

/*
*  Code de suppretion d'une question [Deleted]
* --------------------------------------------------
* */

exports.question_delete_get = function (req, res) {

    Question
        .findOne({
            where: {
                id: req.params.questionId
            }
        })
        .then(() => {
            res.redirect('/');
        });
};

exports.question_delete = function (req, res) {

    Question
        .destroy({
            where: {id: req.params.questionId}
        })
        .then(() => {
            res.redirect('/');
        });
};
