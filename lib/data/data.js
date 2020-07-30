/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for ledger state
const State = require('../../ledger-api/state.js');


class Data extends State {

    constructor(obj) {
        super(Data.getClass(), [obj.type, obj.dataNumber]);
        Object.assign(this, obj);
    }

    /**
     * Basic getters and setters
    */
    getOwners() {
        return this.owners;
    }

    setOwners(newOwners) {
        this.owners = newOwners;
    }

    setProcessRequests(processRequests) {
      this.processRequests = processRequests;
    }

    static fromBuffer(buffer) {
        return Data.deserialize(buffer);
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this));
    }

    /**
     * Deserialize a state data to commercial paper
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, Data);
    }

    /**
     * Factory method to create a commercial paper object
     */
    static createInstance(dataAttributes) {
      return new Data(dataAttributes);
    }

    static getClass() {
        return 'org.Data';
    }
}

module.exports = Data;
