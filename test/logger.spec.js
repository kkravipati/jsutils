import chai from 'chai';
import {Logger} from '../dist/@modil-io/jsutils.js';

const expect = chai.expect;

describe('Logger tests', () => {
    describe('log', () => {
        it('string', () => {
            expect(Logger.log('a'));
        });
        it('number', () => {
            expect(Logger.log(0));
        });
        it('undefined', () => {
            let k;
            expect(Logger.log(k));
        });
    });
});
