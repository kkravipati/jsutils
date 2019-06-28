/**
 * Object related dev utilities
 * @module ObjectUtils
 */

import LangUtils from 'lang-utils';
import ArrayUtils from 'array-utils';

function getKeysFromProperties(obj) {
    let internalKeys = [];

    if (LangUtils.isPlainObject(obj)) {
        for (let i in obj) {
            if (obj.hasOwnProperty(i)) {
                internalKeys.push(i);
            }
        }
    }
    return internalKeys;
}

export default class ObjectUtils {
    /**
     * Create Keys array from the plain object.
     *
     * @param {Object} obj      Plain object to Inspect
     * @return {Array}          Array with all keys of given object.
     */
    static keys(obj) {
        return (LangUtils.isPlainObject(obj) && LangUtils.isFunction(Object.keys)) ?
            Object.keys(obj) : getKeysFromProperties(obj);
    }

    /**
     * Create Values array from the plain object.
     *
     * @param {Object} obj      Plain object to Inspect
     * @return {Array}          Array with all values of given object.
     */
    static values(obj) {
        return this.keys(obj).map(key => obj[key]);
    }

    /**
     * Verify given key is present in the object or not.
     *
     * @param {Object} obj      Plain object to Inspect.
     * @param {String} key      Key value.
     * @return {Boolean}        true if key is present otherwise false.
     */
    static containsKey(obj, key) {
        return LangUtils.isPlainObject(obj) ? obj.hasOwnProperty(key) : false;
    }

    /**
     * Get value from the object for a given key, if key is not present return default value.
     * @param {Object} obj                  Plain object to Inspect.
     * @param {String} key                  key value.
     * @param {*} [defaultValue = null]     Value to be return if key is not present in given Object.
     * @return {*}                          Value for given key from the Object.
     */
    static getValue(obj, key, defaultValue) {
        return this.containsKey(obj, key) ? obj[key] : (defaultValue === undefined) ? null : defaultValue;
    }

    /**
     * Verify given array contains all elements as plain objects or not.
     *
     * @param {Array} objArray                      Array to Inspect.
     * @param {Boolean} [isRecursive=false]         Verify nested items as well.
     * @return {Boolean}                            true if objArry is array of Objects, otherwise false.
     *
     * @example
     *
     * ObjectUtils.isPlainObjectArray([{h: 'h'}, [{k: 'k'}]]);
     * // => false
     *
     * ObjectUtils.isPlainObjectArray([{h: 'h'}, [{k: 'k'}]], true);
     * // => true
     *
     */
    static isPlainObjectArray(objArray, isRecursive) {
        if (!LangUtils.isArray(objArray)) {
            return false;
        }
        for (let i = 0; i < objArray.length; i++) {
            if (!LangUtils.isPlainObject(objArray[i]) &&
                // support for nested levels of arrays
                (!isRecursive || !this.isPlainObjectArray(objArray[i], isRecursive))) {
                return false;
            }
        };

        return true;
    }

    /**
     * Merge one object into another.
     *
     * @param {Object} toDict                       Object on merge operation is going to perform.
     * @param {Object} fromDict                     Object to be merged.
     * @param {Boolean} [recursive=false]           Recursive merge or not.
     * @param {Boolean} [notOverride=false]         Overide or not. by default override is true.
     * @param {Boolean} [ignoreNull=false]          Consider null values & keys or not.
     *                                              By default null values will be merged.
     * @param {Boolean} [extendObjectArray=false]   Override / extend arrays.by defult override arrys is on.
     *
     * @example
     *
     * let toDict = {a: '1', b: {c: '1', e: null}, f: [{g: '1'}] };
     * let fromDict = {b: {c: '2', d: '2', e: '2'}, f: [{g: '2'}] };
     * ObjectUtils.merge(toDict, fromDict);
     * // => toDict is updated as {a: '1', b: {c: '2', d: '2', e: '2'}, f: [{g: '2'}]}
     *
     * let toDict = {a: '1', b: {c: '1', e: null}, f: [{g: '1'}] };
     * let fromDict = {b: {c: '2', d: '2', e: '2'}, f: [{g: '2'}] };
     * ObjectUtils.merge(toDict, fromDict, true, true, true, true);
     * // => toDict is updated as {a: '1', b: {c: '1', d: '2', e: '2'}, f: [{g: '1'}, {g: '2'}]}
     *
     * let toDict = {a: '1', b: {c: '1', e: null}, f: [{g: '1'}] };
     * let fromDict = {b: {c: '2', d: '2', e: '2'}, f: [{g: '2'}] };
     * ObjectUtils.merge(toDict, fromDict, true, true, false, true);
     * // => toDict is updated as {a: '1', b: {c: '1', d: '2', e: null}, f: [{g: '1'}, {g: '2'}]}
     */
    // TODO: support Symbols and Buffer
    static merge(toDict, fromDict, recursive, notOverride, ignoreNull, extendObjectArray) {
        function deepCopyFromDictAttrs(attrName, toDict, fromDict) {
            for (let i = 0; i < toDict[attrName].length; i++) {
                if (LangUtils.isPlainObject(toDict[attrName][i]) &&
                        LangUtils.isPlainObject(fromDict[attrName][i])) {
                    executeMerge(toDict[attrName][i], fromDict[attrName][i]); // eslint-disable-line no-use-before-define, max-len
                }
            }
        }

        function mergeArrays(toArray, fromArray, mergeStartIndex) {
            fromArray = LangUtils.cloneDeep(fromArray.slice(mergeStartIndex)); // null undefined handled by slice
            ArrayUtils.merge(toArray, fromArray);
        }

        function addAdditionalNestedObjs(attrName, toDict, fromDict) {
            const mergeStartIndex = toDict[attrName].length;
            mergeArrays(toDict[attrName], fromDict[attrName], mergeStartIndex);
        }

        function executeMerge(toDict, fromDict) {
            if (toDict && fromDict && LangUtils.isPlainObject(toDict) && LangUtils.isPlainObject(fromDict)) {
                let fromDictKeys = ObjectUtils.keys(fromDict);

                for (let i = 0; i < fromDictKeys.length; i++) {
                    let attrName = fromDictKeys[i];

                    // handle recursive nested objects
                    if (recursive && LangUtils.isPlainObject(toDict[attrName]) && LangUtils.isPlainObject(fromDict[attrName])) { // eslint-disable-line max-len
                        executeMerge(toDict[attrName], fromDict[attrName]);
                    } else if (recursive && ObjectUtils.isPlainObjectArray(toDict[attrName]) &&
                        ObjectUtils.isPlainObjectArray(fromDict[attrName])) { // handle recusive nested objectArrays
                        if (extendObjectArray) { // don't override array items
                            mergeArrays(toDict[attrName], fromDict[attrName]);
                        } else {
                            deepCopyFromDictAttrs(attrName, toDict, fromDict);
                            addAdditionalNestedObjs(attrName, toDict, fromDict);
                        }
                    } else if (!notOverride || // checking not override property
                        !ObjectUtils.containsKey(toDict, attrName) || // checking property exists or not
                        (ignoreNull && !toDict[attrName])) { // checking ignoreNull property
                        // if it container object, clone it to detach completely from fromDict
                        if (LangUtils.isObjectLike(fromDict[attrName])) {
                            toDict[attrName] = LangUtils.cloneDeep(fromDict[attrName]);
                        } else { // other primitives and functions
                            toDict[attrName] = fromDict[attrName];
                        }
                    }
                }
            }
        }

        executeMerge(toDict, fromDict);
    }
}
