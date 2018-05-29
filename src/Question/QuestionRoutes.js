const express = require('express');
const router = express.Router();

const question_controller = require('./QuestionController');

router.route('/')
    .get(question_controller.question_list)

    .post(question_controller.question_create);

router.route('/:questionId')
    .get(question_controller.question_detail)


    .patch(question_controller.question_update)


    .delete(question_controller.question_delete);

module.exports = router;
