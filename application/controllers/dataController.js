const DataContract = require('../contract/dataContract');
const ControllerUtil = require('./ControllerUtil.js');

exports.index = async function(req, res, next){
  const data = { 
    type: ControllerUtil.formatDataType("raw_data"),
    title: "DNA Sapos da Amazonia", 
    description: "Esse é um dado muito relevante sobre Sapos da Amazonia",
    collector: "Indios Tupi Guarani",
    date: ControllerUtil.formatDate(new Date()),
    price: "400"
  }

  const datas = [data,data,data,data,data,data,data,data,data,data,
                 data,data,data,data,data,data,data,data,data,data,
                 data,data,data,data,data,data,data,data,data,data,
                 data,data,data,data,data,data,data,data,data,data,
                 data,data]
  

  res.render('data/index', { datas });
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