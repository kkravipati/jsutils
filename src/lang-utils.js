/**
 * Basic JavaScript Language dev utilities
 * @module LangUtils
 */

import _cloneDeep from 'lodash.clonedeep';
import _clone from 'lodash.clone';
import _isEmpty from 'lodash.isempty';
import _isEqual from 'lodash.isequal';
import selectn from 'selectn';
import _omitDeep from 'omit-deep-lodash';

function checkType(x, type) {
    return typeof x === type;
}

export default class LangUtils {

    /**
     * Execute javascript function with given arguments. if execution fails, return default value.
	 *
     * @example
     * let value = 2
     * LangUtils.scriptExecute(x => x * x, 0, value) //=> 4
     *
     * @param  {Function} func          JavaScript function
     * @param  {*} defaultValue         This can be any value.
     * @param  {...*} args              desired arguments to given function.
     * @return {*}                      function output or default value.
     *
     */
    static scriptExecute(func, defaultValue, ...args) {
        try {
            return func(...args);
        } catch (err) {
            // console.log('scriptExecute exception: ', err);
        }
        return defaultValue;
    }

    /**
     * Verify given value is an array or not.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is an array , otherwise false
     */
    static isArray(x) {
        return this.isObjectLike(x) && x instanceof Array;
    }

    /**
     * Verify given value is an boolean or not.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is a boolean, otherwise false
     */
    static isBoolean(x) {
        return checkType(x, 'boolean');
    }

    /**
     * Verify given value is an date or not.
     * @param  {*} x             Accepts any value.
     * @return {Date}            true if x is a date, otherwise false
     */
    static isDate(x) {
        return this.isObjectLike(x) && x instanceof Date;
    }

    /**
     * Verify given value is an  HTML element or not.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is HTML element, otherwise false
     */
    static isElement(x) {
        return this.isObjectLike(x) &&
        this.scriptExecute(function (x) {return x instanceof HTMLElement;}, false, x);
    }

    /**
     * Verify given value is any empty value or not.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is an empty value, otherwise false
     */
    static isEmpty(x) {
        return _isEmpty(x);
    }

    /**
     * Verify given value is an function or not.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is an function, otherwise false
     */
    static isFunction(x) {
        return checkType(x, 'function');
    }

    /**
     * Verify given value is a number or not.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is an number , otherwise false
     */
    static isNumber(x) {
        return checkType(x, 'number');
    }

    /**
     * Verify given value is a  number like or not.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is number like value , otherwise false
     */
    static isNumberLike(x) {
        return x !== null && !isNaN(x);
    }

    /**
     * Verify given value is object like or not.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is object like, otherwise false
     */
    static isObjectLike(x) {
        return x !== null && checkType(x, 'object');
    }

    /**
     * Verify given value is plain object or not.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is a plain object, otherwise false
     */
    static isPlainObject(x) {
        return this.isObjectLike(x) && Object.getPrototypeOf(x) === Object.prototype;
    }

    /**
     * Verify given value is regular expression or not.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is a regular expression, otherwise false
     */
    static isRegExp(x) {
        return this.isObjectLike(x) && x instanceof RegExp;
    }

    /**
     * Verify given value is a string or not.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is a string, otherwise false
     */
    static isString(x) {
        return checkType(x, 'string');
    }

    /**
     * Verify given value is undefined or not.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is undefined , otherwise false
     */
    static isUndefined(x) {
        return checkType(x, 'undefined');
    }

    /**
     * Create clone object.
     * @param  {*} x                Accepts any value.
     * @return {*}                  clone object.
     */
    static clone(x) {
        return _clone(x);
    }

    /**
     * Create deep clone object.
     * @param  {*} x                Accepts any value.
     * @return {*}                  deep clone object.
     */
    static cloneDeep(x) {
        return _cloneDeep(x);
    }

    /**
     * Performs a deep comparison between two values to determine if they are
     * equivalent.
     *
     * **Note:** This method supports comparing arrays, array buffers, booleans,
     * date objects, error objects, maps, numbers, `Object` objects, regexes,
     * sets, strings, symbols, and typed arrays. `Object` objects are compared
     * by their own, not inherited, enumerable properties. Functions and DOM
     * nodes are **not** supported.
     *
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @return {Boolean} `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'user': 'fred' };
     * var other = { 'user': 'fred' };
     *
     * _.isEqual(object, other);
     * // => true
     *
     * object === other;
     * // => false
     */
    static isEqual(value, other) {
        return _isEqual(value, other);
    }

    /**
     * Get value from JSON object at given path.
     *
     * @param {Object} json                 json object
     * @param {(string\|string[])} path     Dot/bracket-notation string path or array.
     * @return {*}                          value at given path
     * @example
     *
     * LangUtils.query({'a': ['b', 'c']}, 'a[1]');
     * //=> 'c'
     *
     * LangUtils.query({'a': ['b', 'c']}, ['a', 1])
     * //=> 'c'
     */
    static query(json, path) {
        if ((this.isArray(json) || this.isPlainObject(json)) &&
            (this.isArray(path) || this.isString(path))) {
            return selectn(path, json);
        }
        return null;
    }

    /**
     * filter out given keys from objects given value is an boolean or not.
     * @param {Object} object      input object.
     * @param  {...any} props      repeatable keys to be omitted from given objec
     * @return {Object}            keys omitted object.
     * @example
     *
     * LangUtils.omitDeep({a: "a", b: "b", c: {b: "b", d: {b: "b", f: "f"}}}, "b");
     * //=> {a: "a", c: {d: {f: "f"}}}
     */
    static omitDeep(object, ...props) {
        return _omitDeep.apply(null, arguments);
    }
}
