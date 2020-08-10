const DataContract = require('../contract/dataContract');
const ControllerUtil = require('./ControllerUtil.js');

exports.index = async function(req, res, next){
  const dataContract = new DataContract();
  const datas = await dataContract.getAllData();

  const formattedDatas = datas.map(function(data){
    return {
      type: ControllerUtil.formatDataType(data.type),
      title: data.title, 
      description: data.description,
      collector: data.collector,
      created_at: ControllerUtil.formatDate(new Date(data.created_at)),
      price: data.price
    }
  })  

  res.render('processor/index', { datas: formattedDatas });
};


exports.new = async function(req, res, next){
  
  res.render('processor/new', { });
};

exports.create = async function(req, res, next){
  
  res.render('processor/new', { });
};

exports.show = async function(req, res, next){
  
  res.render('processor/show', { });
};