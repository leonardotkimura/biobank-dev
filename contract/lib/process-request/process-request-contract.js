'use strict';

const { Contract, Context } = require('fabric-contract-api');
const ProcessRequest = require('./process-request.js');
const ProcessRequestList = require('./process-request-list.js');


class ProcessRequestContext extends Context {
    constructor() {
        super();
        this.processRequestList = new ProcessRequestList(this);
    }
}

class ProcessRequestContract extends Contract {
    createContext() {
        return new ProcessRequestContext();
    }

    async createProcessRequest(ctx, id, processRequestAttributes) {
        const newProcessRequestAttributes = handleProcessRequestAttributes(id, processRequestAttributes)
        const processRequest = ProcessRequest.createInstance(newProcessRequestAttributes);
        await ctx.processRequestList.addProcessRequest(processRequest);
        return processRequest;
    }

    async readProcessRequest(ctx, id) {
        const processRequest = await ctx.processRequestList.getProcessRequest(id);
        return processRequest;
    }

    async getAllProcessRequest(ctx) {
        return await ctx.processRequestList.getAllProcessRequest();
    }
}

function handleProcessRequestAttributes(id, processRequestAttributes) {
    const { raw_data_id, processor_id, processed_data_id, status, created_at } = JSON.parse(processRequestAttributes);
    const newOperationAttributes = {
        id, raw_data_id, processor_id, processed_data_id, status, created_at
    }
    return newOperationAttributes;
}

module.exports = ProcessRequestContract;
