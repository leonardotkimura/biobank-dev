var express = require('express');
var router = express.Router();

router.use('/', require('./homeRoute'));
router.use('/data', require('./dataRoute'));
router.use('/processor', require('./processorRoute'));
router.use('/operation', require('./operationRoute'));

module.exports = router;
