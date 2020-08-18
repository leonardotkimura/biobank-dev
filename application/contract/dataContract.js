'use strict';

const { FileSystemWallet, Gateway }  = require('fabric-network');
const path = require('path');
const fs = require('fs')

class DataContract {
  async connectNetwork() {
     // Create a new file system based wallet for managing identities.
     const walletPath = path.join(process.cwd(), 'fabric-details/Org1Wallet');
     const wallet = new FileSystemWallet(walletPath);
     console.log(`Wallet path: ${walletPath}`);

     // Create a new gateway for connecting to our peer node.
     this.gateway = new Gateway();
     const connectionProfile = path.resolve(__dirname, '../fabric-details', 'connection.json');
     let connectionOptions = { wallet, identity: 'org1Admin', discovery: { enabled: true, asLocalhost: true }};
     await this.gateway.connect(connectionProfile, connectionOptions);

     // Get the network (channel) our contract is deployed to.
     const network = await this.gateway.getNetwork('mychannel');

     // Get the contract from the network.
     this.contract = network.getContract('chaincode-builder');
  }

  async readData(dataId) {
    await this.connectNetwork();

    const result = await this.contract.evaluateTransaction('DataContract:readData', dataId);
    console.log(`Transaction has been submitted: ${result.toString()}`);

    await this.gateway.disconnect();
    return JSON.parse(result.toString());
  }

  async getAllData() {
    await this.connectNetwork();

    const result = await this.contract.evaluateTransaction('DataContract:getAllData');
    console.log(`Transaction has been submitted: ${result.toString()}`);

    await this.gateway.disconnect();
    return JSON.parse(result.toString());
  }

  async getAllOperation(dataId) {
    await this.connectNetwork();

    const result = await this.contract.evaluateTransaction('OperationContract:getOperationByData', dataId);
    console.log(`Transaction has been submitted: ${result.toString()}`);

    await this.gateway.disconnect();
    return JSON.parse(result.toString());
  }
}

module.exports = DataContract;
