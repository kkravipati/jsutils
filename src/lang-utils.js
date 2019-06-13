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
     * @param  {Function} func          JavaScript function
     * @param  {Object} defaultValue    This can be any object and primitives.
     * @param  {Array} args             Arguments array for the given function.
     * @return {Object}                 function execution output.
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
     * Verify given value is an array object or not.
     * @param  {Object} x          Accepts any value.
     * @return {Boolean}           true if x is an array , otherwise false
     */
    static isArray(x) {
        return this.isObjectLike(x) && x instanceof Array;
    }

    static isBoolean(x) {
        return checkType(x, 'boolean');
    }

    static isDate(x) {
        return this.isObjectLike(x) && x instanceof Date;
    }

    static isElement(x) {
        return this.isObjectLike(x) &&
        this.scriptExecute(function (x) {return x instanceof HTMLElement;}, false, x);
    }

    static isEmpty(x) {
        return _isEmpty(x);
    }

    static isFunction(x) {
        return checkType(x, 'function');
    }

    static isNumber(x) {
        return checkType(x, 'number');
    }

    static isNumberLike(x) {
        return x !== null && !isNaN(x);
    }

    static isObjectLike(x) {
        return x !== null && checkType(x, 'object');
    }

    static isPlainObject(x) {
        return this.isObjectLike(x) && Object.getPrototypeOf(x) === Object.prototype;
    }

    static isRegExp(x) {
        return this.isObjectLike(x) && x instanceof RegExp;
    }

    static isString(x) {
        return checkType(x, 'string');
    }

    static isUndefined(x) {
        return checkType(x, 'undefined');
    }

    static clone(x) {
        return _clone(x);
    }

    static cloneDeep(x) {
        return _cloneDeep(x);
    }

    static isEqual(value, other) {
        return _isEqual(value, other);
    }

    static query(json, path) {
        if ((this.isArray(json) || this.isPlainObject(json)) &&
            (this.isArray(path) || this.isString(path))) {
            return selectn(path, json);
        }
        return null;
    }

    static omitDeep(object, prop1, prop2) {
        return _omitDeep.apply(null, arguments);
    }
}
