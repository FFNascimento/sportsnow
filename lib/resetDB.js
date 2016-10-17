var config = require('../config');
var Q = require('q');
var nano = require('nano')(config.couch.uri);

module.exports.resetDB = function() {
	var deferred = Q.defer();
	
	nano.db.create(config.database, function(err) {
		nano.db.destroy(config.database, function() {
		  	nano.db.create(config.database, function(err) {
	      	
				if (err && err.error === 'file_exists') {
		            err = null;
		        }
		        else if (err) {
		            console.log(err);
		            throw err;
		        }
		        
		        // If everything went fine so far , create the views
		        var views = require('./view');

		        views.populate();

		        setTimeout(function(){ deferred.resolve(); }, 1000);
		  	});
		});
	});
	return deferred.promise;
}

