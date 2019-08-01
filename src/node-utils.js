/**
 * Node env related dev utilities
 * @module NodeUtils
 */
import LangUtils from 'lang-utils';

export default class NodeUtils {
    /**
     * Verify if a window object is available.
     *
     * @return {Boolean}   true if a window object is available, otherwise false
     */
    static isWindowAvailable() {
        return LangUtils.scriptExecute(function () {
            return Boolean(window);
        }, false);
    }
}
