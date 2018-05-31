const express = require('express');
const router = express.Router();

const question_controller = require('./QuestionController');

router.route('/')  //   Route pour afficher toute les questions

    .get(question_controller.question_list);

router.route('/addticket') // Route pour ajouter des questions

    .get(question_controller.question_create_get)

    .post(question_controller.question_create_post);

router.route('/ticket/:questionId') // Route pour affichier une question

    .get(question_controller.question_detail_get)

    .post(question_controller.question_comment_create_post);

router.route('/ticket/:questionId/edit') // Route pour modifier les questions

    .get(question_controller.question_update_get)

    .put(question_controller.question_update_patch);

router.route('/ticket/:questionId/delete') // Route pour supprimer une question

    .get(question_controller.question_delete)

    .delete(question_controller.question_delete);



module.exports = router;
