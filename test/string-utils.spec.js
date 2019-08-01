import chai from 'chai';
import {StringUtils} from '../dist/@modil-io/jsutils.js';

const expect = chai.expect;

describe('StringUtils tests', () => {
    describe('interpolate', () => {
        it('string template with 2 params', () => {
            expect(StringUtils.interpolate('${a} ${b}', {a: 5, b: 3}))
                .to.be.equal('5 3');
        });
        it('string template with number keys', () => {
            class Xaas {
                x() {}
            };
            expect(StringUtils.interpolate('${a} ${b}', {'1': 5, a: 5, b: 3, d: new Xaas(), e: x => x + 1, f: undefined}))
                .to.be.equal('5 3');
        });
        it('missing params - throw exception', () => {
            expect(function () { // wrapper function to catch exception
                StringUtils.interpolate('${a} ${b1}', {a: 5, b: 3});
            }).to.throw('b1 is not defined');
        });
        it('empty params', () => {
            expect(StringUtils.interpolate('a b', {}))
                .to.be.equal('a b');
        });
        it('invalid string with 2 params', () => {
            expect(StringUtils.interpolate(undefined, {a: 5, b: 3}))
                .to.be.equal(null);
        });
        it('template with no params', () => {
            expect(StringUtils.interpolate('a b', undefined))
                .to.be.equal('a b');
        });
        it('keys with number strings', () => {
            expect(StringUtils.interpolate('${a}', {'a': 2, '3': 1}))
                .to.be.equal('2');
        });
    });
});
