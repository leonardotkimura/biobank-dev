const ProcessorContract = require('../contract/processorContract');
const ControllerUtil = require('./ControllerUtil.js');


exports.index = async function(req, res, next){
  

  res.render('processor/index', { });
};


exports.new = async function(req, res, next){
  
  res.render('processor/new', { });
};

exports.create = async function(req, res, next){
  let processor = createProcessorFromRequest(req);
  
  const processorContract = new ProcessorContract();
  await processorContract.createProcessor(processor)

  res.render('processor/show', { processor });
};

exports.show = async function(req, res, next){
  
  res.render('processor/show', { });
};

function createProcessorFromRequest(req){
  return {
    name: req.body.name,
    organization: req.body.organization,
    id: ControllerUtil.generateId()
  }
}