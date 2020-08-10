const DataContract = require('../contract/dataContract');
const ControllerUtil = require('./ControllerUtil.js');


exports.index = async function(req, res, next){
  

  res.render('processor/index', { });
};


exports.new = async function(req, res, next){
  
  res.render('processor/new', { });
};

exports.create = async function(req, res, next){
  let processor = getProcessorFromRequest(req);
  processor.id = ControllerUtil.generateId();
  
  res.render('processor/new', { });
};

exports.show = async function(req, res, next){
  
  res.render('processor/show', { });
};

function getProcessorFromRequest(req){
  return {
    name: req.body.name,
    organization: req.body.organization
  }
}