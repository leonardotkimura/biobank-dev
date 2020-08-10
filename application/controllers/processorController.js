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

  res.redirect("/processor/" + processor.id)
};

exports.show = async function(req, res, next){
  const processorContract = new ProcessorContract();
  const processor = await processorContract.readProcessor(req.params.processor)
  
  res.render('processor/show', { processor });
};

function createProcessorFromRequest(req){
  return {
    name: req.body.name,
    organization: req.body.organization,
    id: ControllerUtil.generateId()
  }
}