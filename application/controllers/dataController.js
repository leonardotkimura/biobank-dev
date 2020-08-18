const DataContract = require('../contract/dataContract');
const ControllerUtil = require('./ControllerUtil.js');

exports.index = async function(req, res, next){
  const dataContract = new DataContract();
  const datas = await dataContract.getAllData();

  const formattedDatas = datas.map(function(data){
    return {
      key: data.key,
      id: data.key,
      type: ControllerUtil.formatDataType(data.type),
      title: data.title,
      description: data.description,
      collector: data.collector,
      created_at: ControllerUtil.formatDate(new Date(data.created_at)),
      price: data.price
    }
  })

  res.render('data/index', { datas: formattedDatas });
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
  const { type, dataId } = getDataParams(req);

  const dataContract = new DataContract();
  const data = await dataContract.readData(type, dataId);

  data.type = ControllerUtil.formatDataType(data.type);
  data.created_at = ControllerUtil.formatDate(new Date(data.created_at));

  res.render('data/show', { data });
};

exports.listOperations = async function(req, res, next){
  const { type, dataId } = getDataParams(req);

  const dataContract = new DataContract();
  const data = await dataContract.readData(type, dataId);
  const operations = await dataContract.getAllOperation(req.params.dataId);

  const formattedOperations = operations.map(function(operation){
    return {
      user: operation.user,
      transaction_id: operation.transaction_id,
      type: ControllerUtil.formatOperationType(operation.type),
      created_at: ControllerUtil.formatDate(new Date(operation.created_at)),
    }
  })

  res.render('data/list-operations', { data, operations: formattedOperations });
};

function getDataParams(req) {
  return {
    type: req.params.dataId.split(':')[0],
    dataId: req.params.dataId.split(':')[1]
  }
}
