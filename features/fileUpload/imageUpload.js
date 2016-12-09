var express = require('express');
var multer = require('multer');
var upload = multer({
    dest: 'uploads/'
});
var router = express.Router();
var maxSize = 3 * 1000 * 1000;

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

var upload = multer({ //multer settings
    storage: storage,
    limits: {
        fileSize: maxSize
    }
}).array('files', 4);

router.post('/upload', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            res.status(500).json({
                error_code: 1,
                err_desc: err
            });
            return;
        }
        // Se o upload foi feito
        res.json({
            error_code: 0,
            err_desc: null,
            uploadedFiles: req.files
        });
    });
});

module.exports = router;
