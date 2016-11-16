var path = require('path');
var _ = require('lodash');

function getEnv(env_name) {
	var ret = env_name;
	if(process.env.VCAP_SERVICES){
		ret = JSON.parse(process.env.VCAP_SERVICES)[env_name][0].name;
	}
	return ret;
}

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
// Get the App Enviroment
var appEnv = cfenv.getAppEnv();
var env = appEnv.getServiceCreds(getEnv('cloudantNoSQLDB Dedicated'));
// All configurations will extend these options
// ============================================
var all = {
	env: process.env.NODE_ENV,
	// Root path of server
	root: path.normalize(__dirname + '/../..'),
	// Server port
	port: (process.env.PORT) || 3001,
	// File size
	fileSize: 2,
	// Server IP
	ip: (process.env.IP) || '0.0.0.0',
	// List of databases
	views: ['users', 'products', 'cart'],
	// Movo everything to a only one database
	database: (process.env['database']) || 'sportsnow_local',
	couch: {
		uri: (process.env.VCAP_APP_PORT) ? env.url : 'http://127.0.0.1:5984'
	}
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = all;
