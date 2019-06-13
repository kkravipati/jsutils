import LangUtils from 'lang-utils';

export default class NumberUtils {
    static isInteger(x) {
        return LangUtils.isNumber(x) &&
            (LangUtils.isFunction(Number.isInteger) ? Number.isInteger(x) : Math.floor(x) === x);
    }
}
