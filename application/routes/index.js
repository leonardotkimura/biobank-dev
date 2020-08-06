var express = require('express');
var router = express.Router();

router.use('/', require('./homeRoute'));
router.use('/data', require('./dataRoute'));

module.exports = router;
