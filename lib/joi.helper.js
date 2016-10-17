'use strict';
(function(){

	var Joi = require('joi');
	var Q   = require('q');

	module.exports = {
		sanitizeError		 : sanitizeError,
		validate      	 : validate,
		validateMultiple : validateMultiple
	};

	/**
	 * Sanitize Joi's standard error message
	 * @param  {Object} joiError Standard Joi validation error
	 * @return {Object}          Improved error message
	 */
	function sanitizeError(joiError) {
		var result = {
			code: 'FIELD_ERRORS',
			fields: []
        };

        joiError.details.forEach(function(e){
        	result.fields.push({
        		field   : e.path,
        		message : e.message
        	});
        });

        return result;
	}

	/**
	 * Wraps Joi's validate function into a Promise
	 * @param  {Object}  object Object to be validate
	 * @param  {Object}  schema Schema to be validated against
	 * @return {Promise}
	 */
	function validate(object, schema) {
		var q = Q.defer();

		Joi.validate(object, schema, function(err, body){
			if (err) { q.reject(err); return; }
			q.resolve(body);
		});

		return q.promise;
	}

	function validateMultiple(objectArray, schema) {
		var promises = [];

		for(var i = 0; i < objectArray.length; i++) {
			promises.push(validate(objectArray[i], schema));
		}

		return Q.all(promises);
	}


})();
