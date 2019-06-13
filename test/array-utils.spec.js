import chai from 'chai';
import {ArrayUtils} from '../dist/@modil-io/jsutils.js';

const expect = chai.expect;

describe('ArrayUtils tests', () => {
    describe('merge()', () => {
        it('Two arrays with elements', () => {
            let toArr = ['e1', 'e2'];
            let fromArr = ['e3', 'e4'];
            ArrayUtils.merge(toArr, fromArr);
            expect(toArr)
                .to.deep.equal(['e1', 'e2', 'e3', 'e4']);
        });
        it('1 array with null', () => {
            let toArr = ['e1', 'e2'];
            let fromArr = null;
            ArrayUtils.merge(toArr, fromArr);
            expect(toArr)
                .to.deep.equal(['e1', 'e2']);
        });
        it('null with one array', () => {
            let toArr = null;
            let fromArr = ['e1', 'e2'];
            ArrayUtils.merge(toArr, fromArr);
            expect(toArr)
                .to.equal(null);
        });
    });

    describe('removeAt()', () => {
        it('remove 2nd element', () => {
            let arr = ['k', 'l'];
            ArrayUtils.removeAt(arr, 1);
            expect(arr)
                .to.deep.equal(['k']);
        });
        it('out of index', () => {
            let arr = ['k', 'l'];
            ArrayUtils.removeAt(arr, 2);
            ArrayUtils.removeAt(arr, -1);
            expect(arr)
                .to.deep.equal(['k', 'l']);
        });
    });

    describe('removeAndInsert()', () => {
        it('insert another array at  1 positioon', () => {
            let arr = ['a', 'b', 'c'];
            let startIndex = 1;
            let endIndex = 1;
            let insertArr = ['e', 'f'];
            ArrayUtils.removeAndInsert(arr, startIndex, endIndex, insertArr);
            expect(arr)
                .to.deep.equal(['a', 'e', 'f', 'b', 'c']);
        });
        it('remove 1 & 2 elements, add another array', () => {
            let arr = ['a', 'b', 'c', 'd'];
            let startIndex = 1;
            let endIndex = 3;
            let insertArr = ['e', 'f'];
            ArrayUtils.removeAndInsert(arr, startIndex, endIndex, insertArr);
            expect(arr)
                .to.deep.equal(['a', 'e', 'f', 'd']);
        });
        it('remove 1 & 2 elements, add invalid array', () => {
            let arr = ['a', 'b', 'c'];
            let startIndex = 1;
            let endIndex = 3;
            let insertArr = null;
            ArrayUtils.removeAndInsert(arr, startIndex, endIndex, insertArr);
            expect(arr)
                .to.deep.equal(['a']);
        });
    });
});
