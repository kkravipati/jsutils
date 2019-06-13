import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { PromiseUtils } from '../dist/@modil-io/jsutils.js';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('PromiseUtils Tests', () => {
    describe('getPromise', () => {
        it('object data', () => {
            let data = {result: 'a'};
            expect(PromiseUtils.getPromise(data))
                .to.eventually.deep.equal(data);
        });
        it('undefined data', () => {
            let data;
            expect(PromiseUtils.getPromise(data))
                .to.eventually.deep.equal(data);
        });
        it('string data', () => {
            let data = 'a';
            expect(PromiseUtils.getPromise(data))
                .to.eventually.deep.equal(data);
        });
        it('boolean data', () => {
            let data = false;
            expect(PromiseUtils.getPromise(data))
                .to.eventually.deep.equal(data);
        });
        it('no data', () => {
            expect(PromiseUtils.getPromise())
                .to.eventually.deep.equal(undefined);
        });
    });
});
