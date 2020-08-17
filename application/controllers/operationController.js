const ProcessorContract = require('../contract/processorContract');
const ControllerUtil = require('./ControllerUtil.js');

exports.create = async function(req, res, next){
  // let processor = createProcessorFromRequest(req);

  // const processorContract = new ProcessorContract();
  // await processorContract.createProcessor(processor)
  const operation = {id: 'teste'}
  res.redirect("/operation/" + operation.id)
};

exports.show = async function(req, res, next){
  // const processorContract = new ProcessorContract();
  // const processor = await processorContract.readProcessor(req.params.processor)

  // processor.created_at = ControllerUtil.formatDate(new Date(processor.created_at))
  const operation = {}
  res.render('operation/show', { operation });
};

function createProcessorFromRequest(req){
  return {
    name: req.body.name,
    organization: req.body.organization,
    id: ControllerUtil.generateId(),
    created_at: new Date().toDateString()
  }
}
