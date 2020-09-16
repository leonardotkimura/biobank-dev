
exports.index = async function(req, res, next){
  res.render('processRequest/index', {  });
};

exports.show = async function(req, res, next){
  res.render('processRequest/show', {  });
};

exports.create = async function(req, res, next){
  res.redirect("/process-request/" + 1)
};