var uuid = require('node-uuid');
var Q = require('q');
var _ = require('lodash');
var config = require('../../config');
var db = require('../../lib/dbconnect')(config);
var couchHelper = require('../../lib/couch.helper');
var type = "user";
var schema = require('../../lib/schema');
var UserSchema = require('./userSchema');
var joiHelper   = require('../../lib/joi.helper');

module.exports = {
	add_user: add_user,
	delete_user: delete_user,
	update_user: update_user,
	get_user: get_user
}

/**
 * Add a new user in the database.
 * @param  {Object}  user object validated by the Joi.
 * @return {Promise}
 */
function add_user(user) {
	var q = Q.defer();
	user.type = type;

	var query = { include_docs: true , key: user.email};

	db.view('users', 'getAllUsers', query, function(err, body){
		if(err) { q.reject(err); }

		body = couchHelper.onlyDocs(body);

		if(body.length == 0) {
			db.insert(user, uuid.v1(), function(err, body) {
				 if(err) {
					 q.reject({error: 'Something is wrong.'});
				 } else {
					 q.resolve(body);
				 }
		 });
	 } else {
		 var prevented = false;
		 for(var i = 0; i < body.length; i++) {
			 if(body[i].email === user.email) {
				 prevented = true;
				 break;
			 }
		 }

		 if(!prevented) {
			 db.insert(user, uuid.v1(), function(err, body) {
 				 if(err) {
 					 q.reject({error: 'Something is wrong.'});
 				 } else {
 					 q.resolve(body);
 				 }
			 });
		 } else {
			 q.reject({error: 'User already exists.'});
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
function delete_user(_id) {
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
function get_user(params) {
	var q = Q.defer();

	db.view('users', 'getAllUsers', {include_docs: true}, function(err, body) {
		if(err) { q.reject(err); return; }
		var body = couchHelper.onlyDocs(body);

		for(var i = 0; i < body.length; i++) {
			if(body[i].email === params.email && body[i].password === params.password) {
				q.resolve(body[i]);
				break;
			}
		}

		q.reject({permission: "UNAUTHORIZED"});
	});
	return q.promise;
}

/**
 * Update a user.
 * @param  {Object}  user object validated by the Joi.
 * @return {Promise}
 */
function update_user(user) {
	var q = Q.defer();
	user.type = type;

	db.get(user._id, {include_docs: true}, function(err, body) {
		if(err) { q.reject(err); }
		 db.insert(user, {_id: user._id, _rev: user._rev}, function(err, body) {
				if(err) {
					q.reject({error: 'Something is wrong.'});
				} else {
					q.resolve(body);
				}
		 });
	});
	return q.promise;
}
