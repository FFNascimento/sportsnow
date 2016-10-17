'use strict';
var _ = require('lodash');
var async = require('async');
var equal = require('deep-equal');
var config = require('../config');
var Q = require('q');
var db = require('./dbconnect')(config);
var types = config.views;
var views = {};
types.forEach(function(view) {
  views[view] = require('../views/' + view);
});

function populateViews(dbName) {
  var dbViews = views[dbName];
  async.eachSeries(Object.keys(dbViews), ensureView);

  function ensureView(viewName) {
    var q = Q.defer();
    if(typeof dbName !== 'string') {
      q.reject(false);
      return q.promise;
    }
    var ddocName = '_design/' + dbName;
    db.get(ddocName, function(err, ddoc) {
      if(err && err.statusCode === 404) {
        return insertDDoc(null);
      } else if(err) {
        q.reject(err);
        return q.promise;
      } else if(equal(ddoc.views, dbViews)) {
        q.resolve(true);
        return q.promise;
      } else {
        return insertDDoc(ddoc);
      }
    });

    function insertDDoc(ddoc) {
      var q = Q.defer();
      if(!ddoc) {
        ddoc = {
          language: 'javascript',
          views: {}
        };
      }
      ddoc.views = views[dbName];
      db.insert(ddoc, ddocName, function(err) {
        if(err && err.statusCode === 409) {
          db.destroy(ddocName, function(err) {
            if(err) {
              q.reject(err);
              return q.promise;
            }
            return ensureView(viewName, cb);
          });
        } else {
          q.reject(false);
        }
      });
    }
  }
};
exports.populate = function populate() {
  async.each(types, populateViews);
};
