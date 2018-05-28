const express = require('express');
const router = express.Router();

const user_controller = require('./userController');

router.route('/:userId')
    .get(user_controller.user_detail)

    .patch(user_controller.user_update)

    .delete(user_controller.user_delete);

module.exports = router;