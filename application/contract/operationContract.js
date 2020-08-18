'use strict';

const { FileSystemWallet, Gateway }  = require('fabric-network');
const path = require('path');
const fs = require('fs')

class OperationContract {
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
     this.network = await this.gateway.getNetwork('mychannel');

     // Get the contract from the network.
     this.contract = this.network.getContract('chaincode-builder');
  }

  async createOperation(operation){
    await this.connectNetwork();

    const transaction = this.contract.createTransaction('OperationContract:createOperation')
    operation.transaction_id = transaction.getTransactionID().getTransactionID()

    const result = await transaction.submit(operation.id, JSON.stringify(operation))

    await this.gateway.disconnect();
  }

  async readOperation(operationId) {
    await this.connectNetwork();

    const result = await this.contract.evaluateTransaction(
      'OperationContract:readOperation',
      operationId
    );

    await this.gateway.disconnect();
    return JSON.parse(result.toString());
  }

  addTransactionIdInOperation(operation){
    // operation.transaction_id = this.network.getTransactionID()
    return operation;
  }
}

module.exports = OperationContract;
