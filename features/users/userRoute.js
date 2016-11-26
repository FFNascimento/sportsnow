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
	.route('/update/user')
	.post(controller.updateUser);

router
	.route('/authorize/user')
	.post(controller.getUser);

router
	.route('/get/users')
	.get(controller.getUsers);

module.exports = router;
