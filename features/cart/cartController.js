var Q = require('q');
var _ = require('lodash');
var Joi = require('joi');
var express = require('express');
var Cart = require('./cartModel');
var schema = require('../../lib/schema');
var CartSchema = require('./cartSchema');
var router = express.Router();

module.exports = {
    addCart: addCart,
    deleteCart: deleteCart,
    updateCart: updateCart,
    getCart: getCart,
};

function addCart(req, res) {
    var parameters = req.body;
    schema.validate(parameters, CartSchema).then(function(body) {
        Cart.add_cart(parameters).then(function(body) {
            res.status(200).json(body);
        }).fail(function(err) {
            res.status(400).json(err);
        });
    }).fail(function(err) {
        res.status(400).json(err);
    });
};

function deleteCart(req, res) {
    var id = req.params.id;
    Cart.delete_cart(id).then(function(body) {
        res.status(200).json(body);
    }).fail(function(err) {
        res.status(400).json(err);
    });
};

function getCart(req, res) {
    Cart.get_carts().then(function(body) {
        res.status(200).json(body);
    }).fail(function(err) {
        res.status(400).json(err);
    });
};

function updateCart(req, res) {
    var parameters = req.body;
    schema.validate(parameters, CartSchema).then(function(body) {
        Cart.update_cart(parameters).then(function(body) {
            res.status(200).json(body);
        }).fail(function(err) {
            res.status(400).json(err);
        });
    }).fail(function(err) {
        res.status(400).json(err);
    });
};
