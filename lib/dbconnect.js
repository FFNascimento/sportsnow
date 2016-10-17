var Cloudant = require('cloudant');

module.exports = function (config) {
    return Cloudant(config.couch.uri).use(config.database);
};
