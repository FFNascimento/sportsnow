
// Database connection
var config = require('../config');
var db = require('../lib/dbconnect')(config);


module.exports = {
    logged: function(req, res, next) {
      return next();
    }
};
