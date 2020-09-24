'use strict';

const ConnectService = require('./../services/connectService.js');

class ProcessRequestContract {
  async connectNetwork() {
    const { network, gateway, contract } = await new ConnectService().connectNetwork()
    this.network = network;
    this.gateway = gateway;
    this.contract = contract
  }

  async createProcessRequest(processRequest){
    await this.connectNetwork();

    const result = await this.contract.submitTransaction(
      'ProcessRequestContract:createProcessRequest',
      processRequest.id,
      JSON.stringify(processRequest)
    )

    await this.gateway.disconnect();
  }

  async readProcessRequest(processRequestId) {
    await this.connectNetwork();

    const result = await this.contract.evaluateTransaction(
      'ProcessRequestContract:readProcessRequest',
      processRequestId
    );

    await this.gateway.disconnect();
    return JSON.parse(result.toString());
  }

  async getAllProcessRequest() {
    await this.connectNetwork();

    const result = await this.contract.evaluateTransaction('ProcessRequestContract:getAllProcessRequest');

    await this.gateway.disconnect();
    return JSON.parse(result.toString());
  }
}

module.exports = ProcessRequestContract;
