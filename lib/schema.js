'use strict';
var Joi = require('joi');
var Q = require('q');
module.exports = {
  validate: function(doc, schema) {
    var q = Q.defer();
    Joi.validate(doc, schema, {
      abortEarly: false
    }, function(err) {
      if(err) {
        var result = {
          code: 'FIELD_ERRORS',
          fields: []
        };
        for(var index = 0; index < err.details.length; ++index) {
          result.fields.push({
            field: err.details[index].path,
            message: err.details[index].message
          });
        }
        q.reject(result);
      }
      q.resolve(doc);
    });
    return q.promise;
  }
};
