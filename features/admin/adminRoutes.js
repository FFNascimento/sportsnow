var express = require('express');
var controller = require('./adminController');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../../client/components/views/admin/', 'dash.html'));
});

module.exports = router;
