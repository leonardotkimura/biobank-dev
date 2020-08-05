const DataContract = require('../contract/dataContract');

exports.index = async function(req, res, next){
  
  res.render('data/index', { });
};


exports.newRawData = async function(req, res, next){
  
  res.render('data/raw-data-new', { });
};

exports.newProcessedData = async function(req, res, next){
  
  res.render('data/processed-data-new', { });
};

exports.createRawData = async function(req, res, next){
  
  res.render('data/raw-data-new', { });
};

exports.createProcessedData = async function(req, res, next){
  
  res.render('data/processed-data-new', { });
};

exports.show = async function(req, res, next){
  
  res.render('data/show', { });
};