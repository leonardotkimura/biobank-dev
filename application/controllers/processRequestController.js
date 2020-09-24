const ProcessRequestContract = require('../contract/processRequestContract');
const DataContract = require('../contract/dataContract');
const ProcessorContract = require('../contract/processorContract');
const ControllerUtil = require('./ControllerUtil.js');

exports.index = async function(req, res, next){
  res.render('processRequest/index', {  });
};

exports.show = async function(req, res, next){
  const processRequestContract = new ProcessRequestContract();
  const dataContract = new DataContract();
  const processorContract = new ProcessorContract();

  const processRequest = await processRequestContract.readProcessRequest(req.params.processRequestId)
  const raw_data = await dataContract.readData(processRequest.raw_data_id);
  const processor = await processorContract.readProcessor(processRequest.processor_id)

  processRequest.created_at = ControllerUtil.formatDate(new Date(processRequest.created_at))

  res.render('processRequest/show', { processRequest, raw_data, processor });
};

exports.create = async function(req, res, next){
  let processRequest = createProcessorRequestFromRequest(req);

  const processRequestContract = new ProcessRequestContract();
  await processRequestContract.createProcessRequest(processRequest)

  res.redirect("/process-request/" + processRequest.id)
};

function createProcessorRequestFromRequest(req){
  return {
    id: ControllerUtil.generateId(),
    raw_data_id: req.body.raw_data_id,
    processor_id: req.body.processor_id,
    processed_data_id: req.body.processed_data_id,
    status: 'not_processed',
    created_at: new Date().toDateString()
  }
}
