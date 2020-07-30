/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class ProcessorContract extends Contract {

    async ProcessorExists(ctx, ProcessorId) {
        const buffer = await ctx.stub.getState(ProcessorId);
        return (!!buffer && buffer.length > 0);
    }

    async createProcessor(ctx, ProcessorId, dataAttributes) {
        const { name, org } = JSON.parse(dataAttributes);

        const exists = await this.ProcessorExists(ctx, ProcessorId);
        if (exists) {
            throw new Error(`The processor ${ProcessorId} already exists`);
        }
        const processor = { name, org };
        const buffer = Buffer.from(JSON.stringify(processor));
        await ctx.stub.putState(ProcessorId, buffer);
    }

    async readProcessor(ctx, ProcessorId) {
        const exists = await this.ProcessorExists(ctx, ProcessorId);
        if (!exists) {
            throw new Error(`The processor ${ProcessorId} does not exist`);
        }
        const buffer = await ctx.stub.getState(ProcessorId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateProcessor(ctx, ProcessorId, newValue) {
        const exists = await this.ProcessorExists(ctx, ProcessorId);
        if (!exists) {
            throw new Error(`The processor ${ProcessorId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(ProcessorId, buffer);
    }

    async deleteProcessor(ctx, ProcessorId) {
        const exists = await this.ProcessorExists(ctx, ProcessorId);
        if (!exists) {
            throw new Error(`The processor ${ProcessorId} does not exist`);
        }
        await ctx.stub.deleteState(ProcessorId);
    }

}

module.exports = ProcessorContract;
