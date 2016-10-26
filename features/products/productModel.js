var uuid = require('node-uuid');
var Q = require('q');
var _ = require('lodash');
var config = require('../../config');
var db = require('../../lib/dbconnect')(config);
var couchHelper = require('../../lib/couch.helper');
var type = "product";
var schema = require('../../lib/schema');
var ProductSchema = require('./productSchema');
var joiHelper   = require('../../lib/joi.helper');

module.exports = {
	add_product: add_product,
	delete_product: delete_product,
	update_product: update_product,
	get_product: get_product
}


/**
 * Remove a user.
 * @param  {String}  _id User's document ID
 * @return {Promise}
 */
function delete_product(_id) {
	var q = Q.defer();
	if(!_id) { q.reject(new Error('MISSING_ID')); return q.promise; }

	db.get(_id, function(err, body) {
		if(err) { q.reject(err); }

		db.destroy(body._id, body._rev, function(err, body) {
			if(err) { q.reject(err); return; }
			q.resolve(body);
		});
 });
	return q.promise;
}

/**
 * Get a specific users
 * @return {Promise}
 */
function get_product(product) {
	var q = Q.defer();

	db.view('users', 'getAllProducts', {include_docs: true}, function(err, body) {
		if(err) { q.reject(err); return; }
		var body = couchHelper.onlyDocs(body);

		for(var i = 0; i < body.length; i++) {
			if(body[i]._id === product) {
				q.resolve(body[i]);
				break;
			}
		}

		q.resolve({permission: "UNAUTHORIZED"});
	});
	return q.promise;
}

/**
 * Update a user.
 * @param  {Object}  user object validated by the Joi.
 * @return {Promise}
 */
function update_product(product) {
	var q = Q.defer();
	product.type = type;

	db.get(product._id, {include_docs: true}, function(err, body) {
		if(err) { q.reject(err); }
		 db.insert(product, {_id: product._id, _rev: product._rev}, function(err, body) {
				if(err) {
					q.reject({error: 'Something is wrong.'});
				} else {
					q.resolve(body);
				}
		 });
	});

	return q.promise;
}

function sell_product(params) {
	var q = Q.defer();

	db.get(params._id, {include_docs: true}, function(err, body) {
	
		if(params.quantity <= body.quantity) {
			if(err) { q.reject(err); }
			 	db.insert(product, {_id: params._id}, function(err, body) {
					if(err) {
						q.reject({error: 'Something is wrong.'});
					} else {
						q.resolve(body);
					}
			 	});
			}
	});

	return q.promise;	
}