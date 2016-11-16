'use strict';
(function(){
	var Joi = require('joi');

	module.exports = {
		_id: Joi.string().optional(),
		_rev: Joi.string().optional(),
		name: Joi.string().optional(),
		product_id: Joi.string().required(),
		description: Joi.string().optional(),
		photo: Joi.string().optional(),
		quantity: Joi.any().optional(),
		price: Joi.any().optional(),
		type: Joi.string().optional(),
		_deleted: Joi.boolean().optional()
	};
})();
