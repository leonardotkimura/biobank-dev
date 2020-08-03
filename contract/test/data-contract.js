/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { DataContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logging = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('DataContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new DataContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"data 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"data 1002 value"}'));
    });

    describe('#dataExists', () => {

        it('should return true for a data', async () => {
            await contract.dataExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a data that does not exist', async () => {
            await contract.dataExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createData', () => {

        it('should create a data', async () => {
            await contract.createData(ctx, '1003', 'data 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"data 1003 value"}'));
        });

        it('should throw an error for a data that already exists', async () => {
            await contract.createData(ctx, '1001', 'myvalue').should.be.rejectedWith(/The data 1001 already exists/);
        });

    });

    describe('#readData', () => {

        it('should return a data', async () => {
            await contract.readData(ctx, '1001').should.eventually.deep.equal({ value: 'data 1001 value' });
        });

        it('should throw an error for a data that does not exist', async () => {
            await contract.readData(ctx, '1003').should.be.rejectedWith(/The data 1003 does not exist/);
        });

    });

    describe('#updateData', () => {

        it('should update a data', async () => {
            await contract.updateData(ctx, '1001', 'data 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"data 1001 new value"}'));
        });

        it('should throw an error for a data that does not exist', async () => {
            await contract.updateData(ctx, '1003', 'data 1003 new value').should.be.rejectedWith(/The data 1003 does not exist/);
        });

    });

    describe('#deleteData', () => {

        it('should delete a data', async () => {
            await contract.deleteData(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a data that does not exist', async () => {
            await contract.deleteData(ctx, '1003').should.be.rejectedWith(/The data 1003 does not exist/);
        });

    });

});