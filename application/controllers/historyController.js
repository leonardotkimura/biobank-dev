const ControllerUtil = require('./ControllerUtil.js');

exports.dataQuery = async function(req, res, next){

  res.render("history/dataQuery", { })
};

exports.dataSearch = async function(req, res, next){
  const data = {id: '123'}
  res.redirect("/history/" + data.id )
};

exports.dataShow = async function(req, res, next){

  res.render('history/dataShow', { });
};

