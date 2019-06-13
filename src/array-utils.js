import LangUtils from 'lang-utils';
import _uniq from 'lodash.uniq';

export default class ArrayUtils {

    static merge(toArr, fromArr) {
        if (LangUtils.isArray(toArr)) {
            this.removeAndInsert(toArr, toArr.length, 0, fromArr);
        }
    }

    static removeAt(arr, index) {
        index = Number(index);
        if (LangUtils.isArray(arr) && index < arr.length && index >= 0) {
            arr.splice(index, 1);
        }
    }

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

    static uniq(arr) {
        return _uniq(arr);
    }

    static indexOf(array, searchElement, fromIndex, isEqualFunc) {
        if (!LangUtils.isArray(array)) {
            return -1;
        }
        if (LangUtils.isFunction(isEqualFunc)) {
            if (!LangUtils.isNumber(fromIndex) || fromIndex < 0) {
                fromIndex = 0;
            }
            for (let i = fromIndex; i < array.length; i++) {
                if (isEqualFunc(array[i], searchElement)) {
                    return i;
                }
            }
            return -1;
        }
        return array.indexOf(array, searchElement, fromIndex);
    }
}
