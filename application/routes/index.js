var express = require('express');
var router = express.Router();

router.use('/', require('./home'));
router.use('/data', require('./data'));

module.exports = router;
