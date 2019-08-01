/**
 * String related dev utilities
 * @module StringUtils
 */

import LangUtils from 'lang-utils';
import ObjectUtils from 'object-utils';

export default class StringUtils {
    /**
     * Creates a new interpolated string with a string template and a data object.
     * @param {String} str           String template to be interpolated.
     * @param {Object} paramsObj     Data object to use in interpolation.
     * @return {String}              Interpolated String.
     *
     * @example
     *
     * StringUtils.interpolate('${a} ${b}', {a: 5, b: 3});
     * // => '5 3'
     */
    static interpolate(str, paramsObj) {
        if (!LangUtils.isString(str)) {
            return null;
        }

        // copy from https://stackoverflow.com/questions/29182244/convert-a-string-to-a-template-string
        if (LangUtils.isPlainObject(paramsObj)) {
            let params = LangUtils.cloneDeep(paramsObj);

            // cleanup number like keys & values
            const keys = Object.keys(params);
            keys.forEach(key => {
                if (LangUtils.isNumberLike(key)) {
                    // number like keys
                    delete params[key];
                } else if (
                    LangUtils.isObjectLike(params[key]) && // filter param value class object
                    !LangUtils.isArray(params[key]) &&
                    !LangUtils.isPlainObject(params[key])
                ) {
                    delete params[key];
                } else if (LangUtils.isFunction(params[key])) {
                    // filter param value function
                    delete params[key];
                } else if (params[key] === undefined) {
                    delete params[key];
                }
            });

            const paramKeys = ObjectUtils.keys(params);
            const paramValues = ObjectUtils.values(params);
            return new Function(...paramKeys, `return \`${str}\`;`)(...paramValues); // eslint-disable-line no-new-func
        }
        return str;
    }
}
