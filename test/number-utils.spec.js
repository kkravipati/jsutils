import chai from 'chai';
import {NumberUtils} from '../dist/@modil-io/jsutils.js';

const expect = chai.expect;

describe('NumberUtils tests', () => {
    describe('isInteger', () => {
        it('string', () => {
            expect(NumberUtils.isInteger('0'))
                .to.be.false;
        });
        it('float', () => {
            expect(NumberUtils.isInteger(0.05))
                .to.be.false;
        });
        it('float with .0 extn - true', () => {
            expect(NumberUtils.isInteger(0.0))
                .to.be.true;
        });
        it('integer', () => {
            expect(NumberUtils.isInteger(-200000000))
                .to.be.true;
        });
        it('very long integer - true', () => {
            expect(NumberUtils.isInteger(-2000000009999999999999999000000000))
                .to.be.true;
        });
    });
});
