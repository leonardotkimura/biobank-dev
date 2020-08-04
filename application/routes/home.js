var router = require('express').Router();
var HomeController = require('./../controllers/home')

exports.engine = 'pug';


router.get('/', HomeController.index);

module.exports = router;
