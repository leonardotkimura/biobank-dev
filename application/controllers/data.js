const DataContract = require('../contract/dataContract');

exports.newRawData = async function(req, res, next){
  
  res.render('data/raw-data-new', { });
};

exports.newProcessedData = async function(req, res, next){
  
  res.render('data/processed-data-new', { });
};