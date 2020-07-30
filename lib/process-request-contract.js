/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const DataContract = require('./data/data-contract');
const ProcessorContract = require('./data/data-contract');

class ProcessRequestContract extends Contract {

    async processRequestExists(ctx, processRequestId) {
        const buffer = await ctx.stub.getState(processRequestId);
        return (!!buffer && buffer.length > 0);
    }

    async createProcessRequest(ctx, processorId, rawDataId) {
        const dataContract = new DataContract();
        const raw_data = await dataContract.readData(ctx, rawDataId);


        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(processRequestId, buffer);
    }

    async readProcessRequest(ctx, processRequestId) {
        const exists = await this.processRequestExists(ctx, processRequestId);
        if (!exists) {
            throw new Error(`The process request ${processRequestId} does not exist`);
        }
        const buffer = await ctx.stub.getState(processRequestId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateProcessRequest(ctx, processRequestId, newValue) {
        const exists = await this.processRequestExists(ctx, processRequestId);
        if (!exists) {
            throw new Error(`The process request ${processRequestId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(processRequestId, buffer);
    }

    async deleteProcessRequest(ctx, processRequestId) {
        const exists = await this.processRequestExists(ctx, processRequestId);
        if (!exists) {
            throw new Error(`The process request ${processRequestId} does not exist`);
        }
        await ctx.stub.deleteState(processRequestId);
    }

}

module.exports = ProcessRequestContract;
