var router = require('express').Router();
var HomeController = require('./../controllers/home')

router.get('/', HomeController.index);

module.exports = router;
