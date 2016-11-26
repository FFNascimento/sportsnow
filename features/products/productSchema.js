'use strict';
(function(){
	var Joi = require('joi');

	module.exports = {
		_id: Joi.string().optional(),
		_rev: Joi.string().optional(),
		name: Joi.string().required(),
		description: Joi.string().required(),
		photo: Joi.array().items(Joi.object().keys({
			name: Joi.string().required(),
			type: Joi.string().required().valid('PRINCIPAL', 'DETALHES')
		})),
		quantity: Joi.any().required(),
		price: Joi.any().required(),
		type: Joi.string().optional(),
		productType: Joi.string().required().valid('MASCULINO', 'FEMININO', 'INFANTIL', 'ESPORTE'),
		_deleted: Joi.boolean().optional()
	};
})();
