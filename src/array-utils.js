/**
 * Array related dev utilities
 * @module ArrayUtils
 */

import LangUtils from 'lang-utils';
import _uniq from 'lodash.uniq';

export default class ArrayUtils {
    /**
     * Merge fromArr array to end of toArr.
     *
     * @param {Array} toArr     The Array of any type to Merge.
     * @param {Array} fromArr   The Array of any type to be merged.
     */
    static merge(toArr, fromArr) {
        if (LangUtils.isArray(toArr)) {
            this.removeAndInsert(toArr, toArr.length, 0, fromArr);
        }
    }

    /**
     * Remove item from Array.
     *
     * @param {Array} arr       The Array of any type to Inspect.
     * @param {Number} index    Array Index, it should be a 0 or +ve integer.
     */
    static removeAt(arr, index) {
        index = Number(index);
        if (LangUtils.isArray(arr) && index < arr.length && index >= 0) {
            arr.splice(index, 1);
        }
    }

    /**
     * Update a part of an array with new some another array items.
     *
     * @param {Array} arr               The Array of any type to Inspect.
     * @param {Number} startIndex       Part Start index, it should be a 0 or +ve integer.
     * @param {Number} endIndex         Part End index, it should be >= startIndex value.
     * @param {Array} insertArr         Another array with items.
     */
    static removeAndInsert(arr, startIndex, endIndex, insertArr) {
        startIndex = Number(startIndex);
        endIndex = Number(endIndex);

        let numItems = (endIndex > startIndex) ? endIndex - startIndex : 0;

        if (!LangUtils.isArray(insertArr)) {
            insertArr = [];
        }
        if (LangUtils.isArray(arr) && startIndex >= 0) {
            arr.splice(startIndex, numItems, ...insertArr);
        }
    }

    /**
     * Creates a duplicate free version of an Array.
     * **Note:** This method does not supports nested arrays.
     *
     * @param {Array} arr       The Array of any type to Inspect
     * @return {Array}          New duplicate free array.
     *
     * @example
     *
     * ArrayUtils.uniq([2, 1, 2]);
     * // => [2, 1]
     */
    static uniq(arr) {
        return _uniq(arr);
    }

    /**
     * An element search in an Array.
     *
     * @param {Array} array                 The Array of any type to Inspect
     * @param {*} searchElement             Element to be searched.
     * @param {Number} [fromIndex=0]        Search start index. It should be a 0 or +ve integer.
     * @param {Function} [isEqualFunc]      Custom Equality function.
     * @return {int}                        Element search Index. If element is not found, it returns -1.
     *
     * @example
     *
     * ArrayUtils.indexOf(['a', 'ab', 'abc'], 'ab');
     * // => 1
     *
     * ArrayUtils.indexOf([[1, 2], null, [1, 3], undefined, 'a'], [1, 3], 0,
     *  (a, b) => ((a === b) || (a && b && a.toString() === b.toString())));
     * // => [2, 1]
     *
     */
    static indexOf(array, searchElement, fromIndex, isEqualFunc) {
        if (!LangUtils.isArray(array)) {
            return -1;
        }

        if (!LangUtils.isNumber(fromIndex) || fromIndex < 0) {
            fromIndex = 0;
        }

        if (LangUtils.isFunction(isEqualFunc)) {
            for (let i = fromIndex; i < array.length; i++) {
                if (isEqualFunc(array[i], searchElement)) {
                    return i;
                }
            }
            return -1;
        }
        return array.indexOf(searchElement, fromIndex);
    }
}
