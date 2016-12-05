var Q = require('q');
var _ = require('lodash');
var Joi = require('joi');
var express = require('express');
var Product = require('./productModel');
var schema = require('../../lib/schema');
var ProductSchema = require('./productSchema');
var router = express.Router();

module.exports = {
    addProduct: addProduct,
    deleteProduct: deleteProduct,
    updateProduct: updateProduct,
    getProduct: getProduct,
    getProducts: getProducts,
    sellProducts: sellProducts,
    getFilterProducts: getFilterProducts,
    getAllRelatedProducts: getAllRelatedProducts
};

function addProduct(req, res) {
    var parameters = req.body;
    schema.validate(parameters, ProductSchema).then(function(body) {
        Product.add_product(parameters).then(function(body) {
            res.status(200).json(body);
        }).fail(function(err) {
            res.status(400).json(err);
        });
    }).fail(function(err) {
        res.status(400).json(err);
    });
};

function deleteProduct(req, res) {
    var id = req.params.id;
    Product.delete_product(id).then(function(body) {
        res.status(200).json(body);
    }).fail(function(err) {
        res.status(400).json(err);
    });
};

function getProduct(req, res) {
    var params = req.params.id;
    Product.get_product(params).then(function(body) {
        res.status(200).json(body);
    }).fail(function(err) {
        res.status(400).json(err);
    });
}

function getProducts(req, res) {
    Product.get_products().then(function(body) {
        res.status(200).json(body);
    }).fail(function(err) {
        res.status(400).json(err);
    });
};

function updateProduct(req, res) {
    var parameters = req.body;
    schema.validate(parameters, ProductSchema).then(function(body) {
        Product.update_product(parameters).then(function(body) {
            res.status(200).json(body);
        }).fail(function(err) {
            res.status(400).json(err);
        });
    }).fail(function(err) {
        res.status(400).json(err);
    });
};

function sellProducts(req, res) {
    var parameters = req.body;
    Product.sell_products(parameters).then(function(body) {
        res.status(200).json(body);
    }).fail(function(err) {
        res.status(400).json(err);
    });
}

function getFilterProducts(req, res) {
    var params = req.params.type;
    Product.get_products_filter(params).then(function(body) {
        res.status(200).json(body);
    }).fail(function(err) {
        res.status(400).json(err);
    });
}

function getAllRelatedProducts(req, res) {
    var params = req.params;
    Product.get_related_products(params).then(function(body) {
        res.status(200).json(body);
    }).fail(function(err) {
        res.status(400).json(err);
    });
}
