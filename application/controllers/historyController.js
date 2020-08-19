const ControllerUtil = require('./ControllerUtil.js');

exports.dataQuery = async function(req, res, next){

  res.render("history/dataQuery", { })
};

exports.dataSearch = async function(req, res, next){
  res.redirect("/history/data/" + req.body.dataId )
};

exports.dataShow = async function(req, res, next){

  res.render('history/dataShow', { });
};

