'use strict';
(function(){
	var Joi = require('joi');

	module.exports = {
		_id: Joi.string().optional(),
		_rev: Joi.string().optional(),
		name: Joi.string().optional(),
		description: Joi.string().optional(),
		photo: Joi.string().optional(),
		quantity: Joi.string().optional(),
		price: Joi.string().optional(),
		type: Joi.string().optional(),
		_deleted: Joi.boolean().optional()
	};
})();
