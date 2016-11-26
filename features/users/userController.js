var Q = require('q');
var _ = require('lodash');
var Joi = require('joi');
var express  = require('express');
var User  = require('./userModel');
var schema = require('../../lib/schema');
var UserSchema = require('./userSchema');
var router   = express.Router();

module.exports = {
	addUser: addUser,
	deleteUser: deleteUser,
	updateUser: updateUser,
	getUser: getUser,
	getUsers: getUsers
};

function addUser(req, res) {
	var parameters = req.body;
	schema.validate(parameters, UserSchema).then(function(body) {
		User.add_user(parameters).then(function(body) {
			res.status(200).json(body);
		}).fail(function(err) {
			res.status(400).json(err);
		});
	}).fail(function(err) {
		res.status(400).json(err);
	});
};

function deleteUser(req, res) {
	var id = req.params.id;
	User.delete_user(id).then(function(body) {
		res.status(200).json(body);
	}).fail(function(err) {
		res.status(400).json(err);
	});
};

function getUser(req, res) {
	var params = req.body;
	User.get_user(params).then(function(body) {
		res.status(200).json(body);
	}).fail(function(err) {
		res.status(403).json(err);
	});
};

function getUsers(req, res) {
	User.get_users().then(function(body) {
		res.status(200).json(body);
	}).fail(function(err) {
		res.status(403).json(err);
	});	
}

function updateUser(req, res) {
	var parameters = req.body;
	schema.validate(parameters, UserSchema).then(function(body) {
		User.update_user(parameters).then(function(body) {
			res.status(200).json(body);
		}).fail(function(err) {
			res.status(400).json(err);
		});
	}).fail(function(err) {
		res.status(400).json(err);
	});
};
