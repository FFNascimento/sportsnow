var Q = require('q');
var _ = require('lodash');
var Joi = require('joi');
var express  = require('express');
var Report  = require('./reportModel');
var router   = express.Router();

module.exports = {
	getUsersReport: getUsersReport,
	getProductsReport: getProductsReport,
	getUsersReportByTime: getUsersReportByTime,
	getProductsReportByTime: getProductsReportByTime
};

function getUsersReport(req, res) {
	var params = req.body;
	Report.get_reports_by_type("user").then(function(body) {
		res.status(200).json(body);
	}).fail(function(err) {
		res.status(403).json(err);
	});
};

function getProductsReport(req, res) {
	var params = req.body;
	Report.get_reports_by_type("product").then(function(body) {
		res.status(200).json(body);
	}).fail(function(err) {
		res.status(403).json(err);
	});
};

function getUsersReportByTime(req, res) {
	var from = req.params.from;
	var to = req.params.to;
	Report.get_reports_by_time(from, to, "user").then(function(body) {
		res.status(200).json(body);
	}).fail(function(err) {
		res.status(403).json(err);
	});
};

function getProductsReportByTime(req, res) {
	var from = req.params.from;
	var to = req.params.to;
	Report.get_reports_by_time(from, to, "product").then(function(body) {
		res.status(200).json(body);
	}).fail(function(err) {
		res.status(403).json(err);
	});
};