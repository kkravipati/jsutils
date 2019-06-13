import chai from 'chai';
import {RegexpUtils} from '../dist/@modil-io/jsutils.js';

const expect = chai.expect;

describe('RegexpUtils tests', () => {
    describe('getRegexp ', () => {
        it('zip4', () => {
            expect(RegexpUtils.getRegexp('zip4')).to.equal('^\\d{4}$');
        });
        it('time', () => {
            expect(RegexpUtils.getRegexp('time')).to.equal('^(1[0-2]|0[1-9]):[0-5][0-9]\s(AM|am|PM|pm)$');
        });
    });
    describe('test ', () => {
        it('zip4', () => {
            expect(RegexpUtils.test(RegexpUtils.getRegexp('zip4'), '1234')).to.equal(true);
        });
        it('zip4 - empty value', () => {
            expect(RegexpUtils.test(RegexpUtils.getRegexp('zip4'))).to.equal(false);
        });
        it('phone', () => {
            expect(RegexpUtils.test(RegexpUtils.getRegexp('phone'), '111-111-1111')).to.equal(true);
        });
        it('empty regexp & no test attr', () => {
            expect(RegexpUtils.test('')).to.equal(true);
        });
        it('empty regexp & any test attr - true', () => {
            expect(RegexpUtils.test('', 'a')).to.equal(true);
        });
        it('empty regexp & false attr - true', () => {
            expect(RegexpUtils.test('', false)).to.equal(true);
        });
    });
});
