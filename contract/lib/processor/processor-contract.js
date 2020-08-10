'use strict';

const { Contract, Context } = require('fabric-contract-api');
const Processor = require('./processor.js');
const ProcessorList = require('./processor-list.js');


class ProcessorContext extends Context {
    constructor() {
        super();
        this.processorList = new ProcessorList(this);
    }
}

class ProcessorContract extends Contract {
    createContext() {
        return new ProcessorContext();
    }

    async createProcessor(ctx, id, name, organization) {
        const processor = Processor.createInstance(id, name, organization);
        await ctx.processorList.addProcessor(processor);
        return processor;
    }

    async readProcessor(ctx, id) {
        const processor = await ctx.processorList.getProcessor(id);
        return processor;
    }
}

module.exports = ProcessorContract;
