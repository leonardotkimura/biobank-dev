/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract, Context } = require('fabric-contract-api');

const Data = require('./data.js');
const DataList = require('./data-list.js');

/**
 * A custom context provides easy access to list of all Data
 */
class CommercialDataContext extends Context {

    constructor() {
        super();
        this.dataList = new DataList(this);
    }
}

class DataContract extends Contract {
    constructor() {
        super('org.data');
    }

    createContext() {
        return new CommercialDataContext();
    }

    async uploadRawData(ctx, dataNumber, dataAttributes) {
        const { url, description, collector, owners, price, conditions } = JSON.parse(dataAttributes);
        const newDataAttributes = { 
            type: 'raw_data', 
            dataNumber, url, description, collector, owners, price, conditions
        }

        const data = Data.createInstance(newDataAttributes);
        await ctx.dataList.addData(data);
        return data;
    }

    // async uploadProcessedData(ctx, dataId, dataAttributes) {
    //     const {
    //         url, description, collector, processor, owners, price, conditions
    //     } = JSON.parse(dataAttributes);

    //     const exists = await this.dataExists(ctx, dataId);
    //     if (exists) {
    //         throw new Error(`The data ${dataId} already exists`);
    //     }
        
    //     const data = {
    //         url,
    //         description,
    //         collector,
    //         processor,
    //         owners,
    //         price,
    //         conditions,
    //         docType: 'processed_data',
    //     };
    //     const buffer = Buffer.from(JSON.stringify(data));
    //     await ctx.stub.putState(dataId, buffer);
    // }

    async readData(ctx, type, dataNumber) {
        let dataKey = Data.makeKey([type, dataNumber]);

        let data = await ctx.dataList.getData(dataKey);
        return data;
    }

    // async updateData(ctx, dataId, dataAttributes) {
    //     const {
    //         url, description, collector, processor, owners, price, conditions, docType
    //     } = JSON.parse(dataAttributes);

    //     const exists = await this.dataExists(ctx, dataId);
    //     if (!exists) {
    //         throw new Error(`The data ${dataId} does not exist`);
    //     }
    //     const data = {
    //         url,
    //         description,
    //         collector,
    //         processor,
    //         owners,
    //         price,
    //         conditions,
    //         docType
    //     };
    //     const buffer = Buffer.from(JSON.stringify(data));
    //     await ctx.stub.putState(dataId, buffer);
    // }

    // async deleteData(ctx, dataId) {
    //     const exists = await this.dataExists(ctx, dataId);
    //     if (!exists) {
    //         throw new Error(`The data ${dataId} does not exist`);
    //     }
    //     await ctx.stub.deleteState(dataId);
    // }

}

module.exports = DataContract;
