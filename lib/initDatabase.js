var Cloudant = require('cloudant');

module.exports = function (config) {

    Cloudant(config.couch.uri).db.create(config.database, function (err) {

        if (err && err.error === 'file_exists') {
            err = null;
            
            console.log('The database is already created. Initializing it.');
        }
        else if (err) {
            console.log(err);
            throw err;
        }
        else {
            console.log('Successfully created the database');
        }
        
        // If everything went fine so far , create the views
        var views = require('./view');

        views.populate();
    });
};
