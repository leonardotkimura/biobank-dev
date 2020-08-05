var router = require('express').Router();
var DataController = require('./../controllers/data')

router.get('/raw-data-new', DataController.newRawData);
router.get('/processed-data-new', DataController.newProcessedData);

module.exports = router;
