var uuid = require('node-uuid');
var Q = require('q');
var _ = require('lodash');
var config = require('../../config');
var db = require('../../lib/dbconnect')(config);
var couchHelper = require('../../lib/couch.helper');
var type = "user";
var schema = require('../../lib/schema');
var UserSchema = require('./userSchema');
var joiHelper = require('../../lib/joi.helper');
var ReportModel = require('../../features/report/reportModel');

module.exports = {
    add_user: add_user,
    delete_user: delete_user,
    update_user: update_user,
    get_user: get_user,
    add_user_sell: add_user_sell,
    get_users: get_users
};

/**
 * Add a new user in the database.
 * @param  {Object}  user object validated by the Joi.
 * @return {Promise}
 */
function add_user(user) {
    var q = Q.defer();
    user.type = type;

    var query = {
        include_docs: true
    };

    db.view('users', 'getAllUsers', query, function(err, body) {
        if (err) {
            q.reject(err);
        }

        body = couchHelper.onlyDocs(body);

        if (body.length == 0) {
            db.insert(user, uuid.v1(), function(err, body) {
                var response = body;
                if (err) {
                    q.reject({
                        error: 'Something is wrong.'
                    });
                } else {
                    ReportModel.add_report("user", body, "ADD").then(function() {
                        q.resolve({
                            _id: response.user_id,
                            _rev: response.user_rev
                        });
                    }, function() {
                        q.resolve({
                            _id: response.user_id,
                            _rev: response.user_rev
                        });
                    });
                }
            });
        } else {
            var prevented = false;
            for (var i = 0; i < body.length; i++) {
                if (body[i].email === user.email) {
                    prevented = true;
                    break;
                }
            }

            if (!prevented) {
                db.insert(user, uuid.v1(), function(err, body) {
                    var response = body;
                    if (err) {
                        q.reject({
                            error: 'Something is wrong.'
                        });
                    } else {
                        ReportModel.add_report("user", body, "ADD").then(function() {
                            q.resolve({
                                _id: response.user_id,
                                _rev: response.user_rev
                            });
                        }, function() {
                            q.resolve({
                                _id: response.user_id,
                                _rev: response.user_rev
                            });
                        });
                    }
                });
            } else {
                q.reject({
                    error: 'User already exists.',
                    exists: true
                });
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
    if (!_id) {
        q.reject(new Error('MISSING_ID'));
        return q.promise;
    }

    db.get(_id, function(err, body) {
        if (err) {
            q.reject(err);
        }

        db.destroy(body._id, body._rev, function(err, body) {
            if (err) {
                q.reject(err);
                return;
            }

            ReportModel.add_report("user", body, "DELETE").then(function() {
                q.resolve(body);
            }, function() {
                q.resolve(body);
            });
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

    db.view('users', 'getAllUsers', {
        include_docs: true
    }, function(err, body) {
        if (err) {
            q.reject(err);
            return;
        }
        var body = couchHelper.onlyDocs(body);
        console.log(params);
        for (var i = 0; i < body.length; i++) {
            if (body[i].email === params.email && body[i].password === params.password) {
                q.resolve(body[i]);
                break;
            }
        }

        q.reject({
            permission: "UNAUTHORIZED"
        });
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

    db.get(user._id, {
        include_docs: true
    }, function(err, body) {
        if (err) {
            q.reject(err);
        }
        db.insert(user, {
            _id: user._id,
            _rev: user._rev
        }, function(err, body) {
            if (err) {
                q.reject({
                    error: 'Something is wrong.\n' + err
                });
            } else {
                ReportModel.add_report("user", body, "UPDATE").then(function() {
                    q.resolve(body);
                }, function() {
                    q.resolve(body);
                });
            }
        });
    });
    return q.promise;
}

function add_user_sell(id, user, sell) {
    var q = Q.defer();
    user.type = type;

    db.get(user, {
        include_docs: true
    }, function(err, body) {
        if (err) {
            q.reject(err);
        }

        if (body.sellHistory == null) {
            body.sellHistory = [];
        }

        var obj = {
            sellId: id,
            products: sell
        }

        body.sellHistory.push(obj);

        db.insert(body, {
            _id: body._id,
            _rev: body._rev
        }, function(err, body) {
            if (err) {
                q.reject({
                    error: 'Something is wrong.\n' + err
                });
            } else {
                q.resolve(body);
            }
        });
    });
    return q.promise;
}

function get_users() {
    var q = Q.defer();

    var query = {
        include_docs: true
    };

    db.view('users', 'getAllUsers', query, function(err, body) {
        if (err) {
            q.reject(err);
        }

        body = couchHelper.onlyDocs(body);
        var obj = [];

        for (var i = 0; i < body.length; i++) {
            var data = {
                _id: body[i]._id,
                _rev: body[i]._rev,
                permission: body[i].permission,
                email: body[i].email,
                name: body[i].name
            };

            obj.push(data);
        }

        q.resolve(obj);
    });
    return q.promise;
}
