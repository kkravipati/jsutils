/**
 * Array Methods
 * @module ArrayUtils
 */

import LangUtils from 'lang-utils';
import _uniq from 'lodash.uniq';

export default class ArrayUtils {
    /**
     * Merge an array to the end of another array. The arrays can contain any types
     *
     * @param {Array} toArr     The array to merge into.
     * @param {Array} fromArr   The array to be merged.
     */
    static merge(toArr, fromArr) {
        if (LangUtils.isArray(toArr)) {
            this.removeAndInsert(toArr, toArr.length, 0, fromArr);
        }
    }

    /**
     * Remove item from array.
     *
     * @param {Array} arr       The array to manipulate.
     * @param {Number} index    The index of the item to be removed, it should be an integer >= 0.
     */
    static removeAt(arr, index) {
        index = Number(index);
        if (LangUtils.isArray(arr) && index < arr.length && index >= 0) {
            arr.splice(index, 1);
        }
    }

    /**
     * Replace (part of) an array with items from another array.
     *
     * @param {Array} arr               The array to manipulate.
     * @param {Number} startIndex       Start index of the part of the array to be replaced, it should
     *                                  be an integer >= 0.
     * @param {Number} [endIndex]       An optional end index of the part of the array to be replaced, To
     *                                  remove items, an end index should be >= startIndex value, alternatively
     *                                  a new array can be inserted by setting end index to null.
     * @param {Array} [insertArr=[]]    An optional array to add in the place of the removed part. This
     *                                  is optional and defaults to an empty array.
     */
    static removeAndInsert(arr, startIndex, endIndex, insertArr) {
        startIndex = Number(startIndex);
        endIndex = Number(endIndex);

        const numItems = endIndex >= startIndex ? endIndex - startIndex + 1 : 0;

        if (!LangUtils.isArray(insertArr)) {
            insertArr = [];
        }
        if (LangUtils.isArray(arr) && startIndex >= 0) {
            arr.splice(startIndex, numItems, ...insertArr);
        }
    }

    /**
     * Removes duplicate items from an array (uses Lodash uniq method).
     * **Note:** This method does not supports nested arrays.
     *
     * @param {Array} arr       The array to manipulate
     * @return {Array}          New array without duplicates.
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
     * Search for an element in an Array.
     *
     * @param {Array} array                 The array to be searched.
     * @param {*} searchElement             The element to search for.
     * @param {Number} [fromIndex=0]        The index to start searching from. It should be an integer >= 0.
     * @param {Function} [isEqualFunc]      A custom equality function to use for the search.
     *
     * @return {int}                        Element search Index. If element is not found, it returns -1.
     *
     * @example
     *
     * ArrayUtils.indexOf(['a', 'ab', 'abc'], 'ab');
     * // => 1
     *
     * ArrayUtils.indexOf([[1, 2], null, [1, 3], undefined, 'a'], [1, 3], 0,
     *  (a, b) => ((a === b) || (a && b && a.toString() === b.toString())));
     * // => 2
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
