var uuid = require('node-uuid');
var Q = require('q');
var _ = require('lodash');
var config = require('../../config');
var couchHelper = require('../../lib/couch.helper');
var db = require('../../lib/dbconnect')(config);
var type = "report";
var joiHelper = require('../../lib/joi.helper');

module.exports = {
    add_report: add_report,
    get_reports_by_type: get_reports_by_type,
    get_reports_by_time: get_reports_by_time
};

function add_report(reportType, entry, operation) {

    entry.reportType = reportType;
    entry.operation = operation;
    entry.timestamp = new Date();
    entry.type = type;

    if(reportType === "product") {
        entry.product_id = entry.id;
        entry.product_rev = entry.rev;
    } else {
        entry.user_id = entry.id;
        entry.user_rev = entry.rev;
    }

    delete entry.id;
    delete entry.rev;

    var q = Q.defer();

    db.insert(entry, uuid.v1(), function(err, variable) {
        if (err) {
            q.reject({
                error: 'Something is wrong.'
            });
        } else {
            q.resolve();
        }
    });

    return q.promise;
}

function get_reports_by_type(type) {
    var q = Q.defer();
    var query = {include_docs: true};

    db.view('report', 'getAllReports', query, function(err, body) {
        if (err) { q.reject(err); return; }

        var obj = [];
        var body = couchHelper.onlyDocs(body);

        for(var i = 0; i < body.length; i++) {
            if(body[i].reportType === type) {
                obj.push(body[i]);
            }
        }

        q.resolve(obj);
    });

    return q.promise;
}

function get_reports_by_time(from, to, type) {
    var q = Q.defer();
    var query = {include_docs: true};

    db.view('report', 'getAllReports', query, function(err, body) {
        if (err) { q.reject(err); return; }

        var obj = [];
        var body = couchHelper.onlyDocs(body);
        
        for(var i = 0; i < body.length; i++) {
            var compare = new Date(body[i].timestamp.substring(0, 10).split("-").reverse().join("-")).getTime() / 1000;

            if(compare >= from && compare <= to && body[i].reportType === type) {
                obj.push(body[i]);
            }
        }

        q.resolve(obj);
    });

    return q.promise;   
}