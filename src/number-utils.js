/**
 * Array related dev utilities
 * @module NumberUtils
 */

import LangUtils from 'lang-utils';

export default class NumberUtils {
    /**
     * Verify if a given value is an integer.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is an integer, otherwise false
     */
    static isInteger(x) {
        return (
            LangUtils.isNumber(x) &&
            (LangUtils.isFunction(Number.isInteger) ? Number.isInteger(x) : Math.floor(x) === x)
        );
    }
}
