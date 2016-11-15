// Express settings
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Need to find a way to run some code just at the beginning of the project
var config = require('./config');
var initDatabase = require('./lib/initDatabase')(config);
var db = require('./lib/dbconnect')(config);

// Setting Up the Express Configuration
app.use(require('cors')());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Enable reverse proxy support in Express. This causes the
// the "X-Forwarded-Proto" header field to be trusted so its
// value can be used to determine the protocol. See
// http://expressjs.com/api#app-settings for more details.
app.enable('trust proxy');

if (process.env.VCAP_APP_PORT) {
    // Add a handler to inspect the req.secure flag (see
    // http://expressjs.com/api#req.secure). This allows us
    // to know whether the request was via http or https.
    app.use(function(req, res, next) {
        if (req.secure) {
            // request was via https, so do no special handling
            next();
        } else {
            // request was via http, so redirect to https
            res.redirect('https://' + req.headers.host + req.url);
        }
    });

}
// Routes
app.use('/api/', require('./features'));
app.use('/', express.static(__dirname + '/client/'));

// Start Server
var server = require('http').createServer(app);
server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Exporting the App for using it in later modules
exports.app = app;
