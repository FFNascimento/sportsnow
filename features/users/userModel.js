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
	get_users: get_users,
	update_user: update_user,
	get_user: get_user,
	bulk_users: bulk_users
}

/**
 * Add a new user in the database.
 * @param  {Object}  user object validated by the Joi.
 * @return {Promise}
 */
function add_user(user) {
	var q = Q.defer();
	user.type = type;

	var query = { include_docs: true , key: user.PERMISSION_EMAIL};

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
			 if(body[i].PERMISSION_EMAIL === user.PERMISSION_EMAIL) {
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
 * Get all users
 * @return {Promise}
 */
function get_users() {
	var q = Q.defer();

	db.view('users', 'getAllUsers', {include_docs: true}, function(err, body) {
		if(err) { q.reject(err); return; }
		var teste = couchHelper.onlyDocs(body);
		q.resolve(teste);
	});
	return q.promise;
}

/**
 * Get a specific users
 * @return {Promise}
 */
function get_user(email) {
	var q = Q.defer();

	db.view('users', 'getAllUsers', {include_docs: true}, function(err, body) {
		if(err) { q.reject(err); return; }
		var body = couchHelper.onlyDocs(body);

		for(var i = 0; i < body.length; i++) {
			if(body[i].PERMISSION_EMAIL === email) {
				q.resolve(body[i]);
				break;
			}
		}

		q.resolve({PERMISSION_PROFILE: "UNAUTHORIZED"});
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

function bulk_users(users) {
	var q = Q.defer();

	db.view('users', 'getAllUsers', {include_docs: true}, function(err, body) {
		if(err) { q.reject(err); return; }
		var body = couchHelper.onlyDocs(body);

		for(var i = 0; i < users.length; i++) {
			users[i].type = type;
			var isNew = true;
			for(var j = 0; j < body.length; j++) {
				if(users[i].PERMISSION_EMAIL === body[j].PERMISSION_EMAIL) {
					body[j].PERMISSION_PROFILE = users[i].PERMISSION_PROFILE;
					isNew = false;
				}
			}

			if(isNew) {
				body.push(users[i]);
			}
		}

		for(var i = 0; i < body.length; i++) {
			var exists = false;
			for(var j = 0; j < users.length; j++) {
				if(users[j].PERMISSION_EMAIL === body[i].PERMISSION_EMAIL) {
					exists = true;
					break;
				}
			}

			if(!exists) {
				body[i]._deleted = true;
			}
		}

		joiHelper.validateMultiple(body, UserSchema).then(function(body){
			db.bulk({docs: body}, function(error, body) {
				q.resolve(body);
			});
		}).fail(function(error) {
			q.reject(error);
		});
	});
	return q.promise;
}
