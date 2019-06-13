import chai from 'chai';
import {NodeUtils} from '../dist/@modil-io/jsutils.js';

const expect = chai.expect;

describe('NodeUtils tests', () => {
    describe('isWindowAvailable', () => {
        it('no args', () => {
            expect(NodeUtils.isWindowAvailable())
                .to.be.true;
        });
    });
});
