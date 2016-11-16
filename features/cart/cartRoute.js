var express  = require('express');
var controller  = require('./cartController');
var router   = express.Router();

router
	.route('/add/cart')
	.put(controller.addCart);

router
	.route('/delete/cart/:id')
	.delete(controller.deleteCart);

router
	.route('/update/cart')
	.post(controller.updateCart);

router
	.route('/get/carts')
	.get(controller.getCart);

module.exports = router;
