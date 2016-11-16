'use strict';
(function(){
	var Joi = require('joi');

	module.exports = {
		_id: Joi.string().optional(),
		_rev: Joi.string().optional(),
		name: Joi.string().optional(),
		description: Joi.string().optional(),
		photo: Joi.array().items(Joi.object().keys({
			name: Joi.string().required(),
			type: Joi.string().required().valid('PRINCIPAL', 'DETALHES')
		})),
		quantity: Joi.any().optional(),
		price: Joi.any().optional(),
		type: Joi.string().optional(),
		productType: Joi.string().required().valid('MASCULINO', 'FEMININO', 'INFANTIL', 'ESPORTE'),
		_deleted: Joi.boolean().optional()
	};
})();
