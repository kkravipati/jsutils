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
    static keys(obj) {
        return (LangUtils.isPlainObject(obj) && LangUtils.isFunction(Object.keys)) ?
            Object.keys(obj) : getKeysFromProperties(obj);
    }

    static values(obj) {
        return this.keys(obj).map(key => obj[key]);
    }

    static containsKey(obj, key) {
        return LangUtils.isPlainObject(obj) ? obj.hasOwnProperty(key) : false;
    }

    static getValue(obj, key, defaultValue) {
        return this.containsKey(obj, key) ? obj[key] : (defaultValue === undefined) ? null : defaultValue;
    }

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
