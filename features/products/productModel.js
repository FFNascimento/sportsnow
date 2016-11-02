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
	get_product: get_product,
	get_products: get_products
}

/**
 * Add a new user in the database.
 * @param  {Object}  user object validated by the Joi.
 * @return {Promise}
 */
function add_product(product) {
	var q = Q.defer();
	product.type = type;

	var query = { include_docs: true };

	db.view('products', 'getAllProducts', query, function(err, body){
		if(err) { q.reject(err); }


		console.log(JSON.stringify(body));

		console.log(body.rows);

		if(body.rows.length == 0) {
			db.insert(product, uuid.v1(), function(err, body) {
				if(err) {
					q.reject({error: 'Something is wrong.'});
				} else {
					q.resolve(body);
				}
	 		});
	 	} else {
			var prevented = false;
			for(var i = 0; i < body.length; i++) {
				if(body[i].name === product.name) {
				prevented = true;
				break;
			}
		}

		 if(!prevented) {
			 db.insert(product, uuid.v1(), function(err, body) {
 				 if(err) { 
 					 q.reject({error: 'Something is wrong.'});
 				 } else {
 					 q.resolve(body);
 				 }
			 });
		 } else {
			 q.reject({error: 'Product already exists.'});
		 }
	 }
 });
	return q.promise;
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

	db.view('products', 'getAllProducts', {include_docs: true}, function(err, body) {
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

function get_products() {
	var q = Q.defer();

	db.view('products', 'getAllProducts', {include_docs: true}, function(err, body) {
		if(err) { q.reject(err); return; }
		var body = couchHelper.onlyDocs(body);
		q.resolve(body);
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
			body.quantity -= params.quantity;

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