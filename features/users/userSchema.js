'use strict';
(function(){
	var Joi = require('joi');

	module.exports = {
		_id: Joi.string().optional(),
		_rev: Joi.string().optional(),
		PERMISSION_PROFILE: Joi.string().required().valid('EDITOR', 'ADMIN', 'APPONLY'),
		PERMISSION_EMAIL: Joi.string().required(),
		type: Joi.string().optional(),
		_deleted: Joi.boolean().optional()
	};
})();
