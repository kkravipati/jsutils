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
        it('insert another array at 1 position', () => {
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
        it('Invalid end index', () => {
            let arr = ['a', 'b', 'c', 'd'];
            let startIndex = 1;
            let endIndex = -3;
            let insertArr = ['e', 'f'];
            ArrayUtils.removeAndInsert(arr, startIndex, endIndex, insertArr);
            expect(arr)
                .to.deep.equal(['a', 'e', 'f', 'b', 'c', 'd']);
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
        it('invalid start index', () => {
            let arr = ['a', 'b', 'c'];
            let startIndex = -1;
            let endIndex = 3;
            let insertArr = null;
            ArrayUtils.removeAndInsert(arr, startIndex, endIndex, insertArr);
            expect(arr)
                .to.deep.equal(['a', 'b', 'c']);
        });
    });

    describe('uniq()', () => {
        it('number array', () => {
            expect(ArrayUtils.uniq([1, 2, 3, 1]))
                .to.deep.equal([1, 2, 3]);
        });

        it('nested array', () => {
            expect(ArrayUtils.uniq([1, [1, 2], 3, [1, 2]]))
                .to.deep.equal([1, [1, 2], 3, [1, 2]]);
        });

        it('string array', () => {
            expect(ArrayUtils.uniq(['a', 'a ', 'a', 'a ', ' a']))
                .to.deep.equal(['a', 'a ', ' a' ]);
        });
        it('array with null values', () => {
            expect(ArrayUtils.uniq(['1', 1, null, undefined, '1', 1, null, undefined]))
                .to.deep.equal(['1', 1, null, undefined]);
        });
    });

    describe('indexOf()', () => {
        it('string array', () => {
            expect(ArrayUtils.indexOf(['a', 'ab', 'abc'], 'ab'))
                .to.equal(1);
        });
        it('number array with duplicates and negative start index', () => {
            expect(ArrayUtils.indexOf([1, 0, 1, 0], 0, -2))
                .to.equal(1);
        });
        it('array with null & undefined', () => {
            expect(ArrayUtils.indexOf([1, 'a', null, undefined, 'k'], 'k'))
                .to.equal(4);
        });
        it('array with no key', () => {
            expect(ArrayUtils.indexOf([1, 'a', null, undefined, 'k'], 'k1'))
                .to.equal(-1);
        });
        it('nested array search with custom function', () => {
            expect(ArrayUtils.indexOf([[1, 2], null, [1, 3], undefined, 'a'], [1, 3], 0,
                (a, b) => ((a === b) || (a && b && a.toString() === b.toString()))))
                .to.equal(2);
        });
        it('nested array search with custom function', () => {
            expect(ArrayUtils.indexOf([[1, 2], null, [1, 3], undefined, 'a'], [1, 3], 6,
                (a, b) => ((a === b) || (a && b && a.toString() === b.toString()))))
                .to.equal(-1);
        });
        it('search on undefined', () => {
            expect(ArrayUtils.indexOf(undefined, undefined, 6,
                (a, b) => ((a === b) || (a && b && a.toString() === b.toString()))))
                .to.equal(-1);
        });
    });
});
