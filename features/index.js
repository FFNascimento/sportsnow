var express = require('express'),
    router = express.Router();
router.all('/', function(req, res) {
    res.status(200).json({
        success: 200,
        message: 'Welcome to the SmartSelling API.'
    });
});

router.use(require('./login/loginController'));
router.use(require('./users/userRoute'));

module.exports = router;
