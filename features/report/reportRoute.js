var express  = require('express');
var controller  = require('./reportController');
var router   = express.Router();

router
	.route('/get/report/users')
	.get(controller.getUsersReport);

router
	.route('/get/report/products')
	.get(controller.getProductsReport);

router
	.route('/get/report/users/:from/:to')
	.get(controller.getUsersReportByTime);

router
	.route('/get/report/products/:from/:to')
	.get(controller.getProductsReportByTime);

module.exports = router;
