var uuid = require('node-uuid');
var Q = require('q');
var _ = require('lodash');
var config = require('../../config');
var db = require('../../lib/dbconnect')(config);
var couchHelper = require('../../lib/couch.helper');
var type = "cart";
var schema = require('../../lib/schema');
var joiHelper = require('../../lib/joi.helper');
var UserModel = require('../../features/users/userModel');

module.exports = {
    add_cart: add_cart,
    delete_cart: delete_cart,
    update_cart: update_cart,
    get_carts: get_carts
}

/**
 * Add a new user in the database.
 * @param  {Object}  user object validated by the Joi.
 * @return {Promise}
 */
function add_cart(cart) {
    var q = Q.defer();
    cart.type = type;

    var query = {
        include_docs: true
    };

    db.view('cart', 'getAllCarts', query, function(err, body) {
        if (err) {
            q.reject(err);
        }

        if (body.rows.length == 0) {
            db.insert(cart, uuid.v1(), function(err, body) {
                if (err) {
                    q.reject({
                        error: 'Something is wrong.'
                    });
                } else {
                    q.resolve(body);
                }
            });
        } else {
            var prevented = false;
            for (var i = 0; i < body.length; i++) {
                if (body[i].name === cart.name) {
                    prevented = true;
                    break;
                }
            }

            if (!prevented) {
                db.insert(cart, uuid.v1(), function(err, body) {
                    if (err) {
                        q.reject({
                            error: 'Something is wrong.'
                        });
                    } else {
                        q.resolve(body);
                    }
                });
            } else {
                q.reject({
                    error: 'Cart already exists.'
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
function delete_cart(_id) {
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
            q.resolve(body);
        });
    });
    return q.promise;
}

function get_carts() {
    var q = Q.defer();

    db.view('cart', 'getAllCarts', {
        include_docs: true
    }, function(err, body) {
        if (err) {
            q.reject(err);
            return;
        }
        var body = couchHelper.onlyDocs(body);
        q.resolve(body);
    });
    return q.promise;
}

/**
 * Update a user.
 * @param  {Object}  user object validated by the Joi.
 * @return {Promise}
 */
function update_cart(cart) {
    var q = Q.defer();
    cart.type = type;

    db.get(cart._id, {
        include_docs: true
    }, function(err, body) {
        if (err) {
            q.reject(err);
        }
        db.insert(cart, {
            _id: cart._id,
            _rev: cart._rev
        }, function(err, body) {
            if (err) {
                q.reject({
                    error: 'Something is wrong.'
                });
            } else {
                q.resolve(body);
            }
        });
    });

    return q.promise;
}