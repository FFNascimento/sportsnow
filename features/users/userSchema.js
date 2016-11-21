'use strict';
(function() {
    var Joi = require('joi');

    module.exports = {
        _id: Joi.string().optional(),
        _rev: Joi.string().optional(),
        permission: Joi.string().required().valid('ADMIN', 'USER'),
        name: Joi.string().required(),
        cpf: Joi.string().optional(),
        rg: Joi.string().optional(),
        endereco: Joi.array().items(Joi.object().keys({
            rua: Joi.string().required(),
						numero: Joi.number().required(),
            bairro: Joi.string().required(),
            cidade: Joi.string().required(),
            uf: Joi.string().max(2).required()
        })),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        type: Joi.string().optional(),
        _deleted: Joi.boolean().optional()
    };
})();
