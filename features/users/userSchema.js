'use strict';
(function(){
	var Joi = require('joi');

	module.exports = {
		_id: Joi.string().optional(),
		_rev: Joi.string().optional(),
		permission: Joi.string().required().valid('ADMIN', 'USER'),
		name: Joi.string().optional(),
		cpf: Joi.string().optional(),
		rg: Joi.string().optional(),
		endereco: Joi.string().optional(),
		email: Joi.string().required(),
		password: Joi.string().required(),
		type: Joi.string().optional(),
		_deleted: Joi.boolean().optional()
	};
})();
