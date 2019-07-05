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
     * Execute javascript function with given arguments. If the execution fails, return a default value.
     *
     * @param  {Function} func          JavaScript function.
     * @param  {*} defaultValue         This can be any value.
     * @param  {...*} args              The arguments to pass to the function.
     *
     * @return {*}                      function output or default value.
     *
     * @example
     * let value = 2
     * LangUtils.scriptExecute(x => x * x, 0, value) //=> 4
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
     * Verify if a given value is an array.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is an array, otherwise false
     */
    static isArray(x) {
        return this.isObjectLike(x) && x instanceof Array;
    }

    /**
     * Verify if a given value is a boolean.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is a boolean, otherwise false
     */
    static isBoolean(x) {
        return checkType(x, 'boolean');
    }

    /**
     * Verify if a given value is a date.
     * @param  {*} x             Accepts any value.
     * @return {Date}            true if x is a date, otherwise false
     */
    static isDate(x) {
        return this.isObjectLike(x) && x instanceof Date;
    }

    /**
     * Verify if a given value is a HTML element.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is a HTML element, otherwise false
     */
    static isElement(x) {
        return (
            this.isObjectLike(x) &&
            this.scriptExecute(
                function (x) {
                    return x instanceof HTMLElement;
                },
                false,
                x
            )
        );
    }

    /**
     * Verify if a given value is an empty value  (uses Lodash isEmpty method).
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is an empty value, otherwise false
     */
    static isEmpty(x) {
        return _isEmpty(x);
    }

    /**
     * Verify if a given value is a function.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is an function, otherwise false
     */
    static isFunction(x) {
        return checkType(x, 'function');
    }

    /**
     * Verify if a given value is a number.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is an number, otherwise false
     */
    static isNumber(x) {
        return checkType(x, 'number');
    }

    /**
     * Verify if a given value is a number like.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is number like, otherwise false
     */
    static isNumberLike(x) {
        return x !== null && !isNaN(x);
    }

    /**
     * Verify if a given value is an object like or not.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is object like, otherwise false
     */
    static isObjectLike(x) {
        return x !== null && checkType(x, 'object');
    }

    /**
     * Verify if a given value is a plain object or not.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is a plain object, otherwise false
     */
    static isPlainObject(x) {
        return this.isObjectLike(x) && Object.getPrototypeOf(x) === Object.prototype;
    }

    /**
     * Verify if a given value is a regular expression or not.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is a regular expression, otherwise false
     */
    static isRegExp(x) {
        return this.isObjectLike(x) && x instanceof RegExp;
    }

    /**
     * Verify if a given value is a string or not.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is a string, otherwise false
     */
    static isString(x) {
        return checkType(x, 'string');
    }

    /**
     * Verify if a given value is undefined or not.
     * @param  {*} x                Accepts any value.
     * @return {Boolean}            true if x is undefined, otherwise false
     */
    static isUndefined(x) {
        return checkType(x, 'undefined');
    }

    /**
     * Create a shallow clone object (uses Lodash clone method).
     * @param  {*} x                Accepts any value.
     * @return {*}                  cloned object.
     */
    static clone(x) {
        return _clone(x);
    }

    /**
     * Create a deep clone object (uses Lodash cloneDeep method).
     * @param  {*} x                Accepts any value.
     * @return {*}                  deep cloned object.
     */
    static cloneDeep(x) {
        return _cloneDeep(x);
    }

    /**
     * Performs a deep comparison between two values to determine if they are
     * equivalent (uses Lodash isEqual method).
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
     * LangUtils.isEqual(object, other);
     * // => true
     *
     * object === other;
     * // => false
     */
    static isEqual(value, other) {
        return _isEqual(value, other);
    }

    /**
     * Get a value from a JSON object at a given path.
     *
     * @param {Object} json                 JSON object
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
        if ((this.isArray(json) || this.isPlainObject(json)) && (this.isArray(path) || this.isString(path))) {
            return selectn(path, json);
        }
        return null;
    }

    /**
     * Filter out keys from an object.
     * @param {Object} object      The input object.
     * @param  {...any} props      Keys to be omitted from the given object
     * @return {Object}            object with keys omitted.
     * @example
     *
     * LangUtils.omitDeep({a: "a", b: "b", c: {b: "b", d: {b: "b", f: "f"}}}, "b");
     * //=> {a: "a", c: {d: {f: "f"}}}
     */
    static omitDeep(object, ...props) {
        return _omitDeep.apply(null, arguments);
    }
}
