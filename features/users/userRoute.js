var express  = require('express');
var controller  = require('./userController');
var router   = express.Router();

router
	.route('/add/user')
	.put(controller.addUser);

router
	.route('/delete/user/:id')
	.delete(controller.deleteUser);

router
	.route('/get/users')
	.get(controller.getUsers);

router
	.route('/update/user')
	.post(controller.updateUser);

router
	.route('/get/user/:email')
	.get(controller.getUser);

router
	.route('/bulk/users')
	.put(controller.bulkUsers);

module.exports = router;
