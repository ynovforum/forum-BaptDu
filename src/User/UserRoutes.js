const express = require('express');
const router = express.Router();

const user_controller = require('./UserController');

router.route('/')  //   Route pour afficher toute les users

    .get(user_controller.user_list);


router.route('/user/:userId/edit') // Route pour modifier les users

    .get(user_controller.user_update_get)

    .put(user_controller.user_update_patch);

router.route('/user/:userId/delete') // Route pour supprimer un user

    .get(user_controller.user_delete)

    .delete(user_controller.user_delete);

module.exports = router;
