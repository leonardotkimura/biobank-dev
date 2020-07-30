/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for collections of ledger states --  a state list
const StateList = require('../../ledger-api/statelist.js');

const Data = require('./data.js');

class DataList extends StateList {

    constructor(ctx) {
        super(ctx, 'org.datalist');
        this.use(Data);
    }

    async addData(data) {
        return this.addState(data);
    }

    async getData(dataId) {
        return this.getState(dataId);
    }

    async updateData(data) {
        return this.updateState(data);
    }
}


module.exports = DataList;
