var express  = require('express');
var controller  = require('./productController');
var router   = express.Router();

router
	.route('/add/product')
	.put(controller.addProduct);

router
	.route('/delete/product/:id')
	.delete(controller.deleteProduct);

router
	.route('/update/product')
	.post(controller.updateProduct);

router
	.route('/get/product/:id')
	.get(controller.getProduct);

router
	.route('/get/products')
	.get(controller.getProducts);

router
	.route('/sell/products')
	.post(controller.sellProducts);

module.exports = router;
