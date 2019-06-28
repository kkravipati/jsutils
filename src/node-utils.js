/**
 * Node env related dev utilities
 * @module NodeUtils
 */
import LangUtils from 'lang-utils';

export default class NodeUtils {

    /**
     * Verify window object is available or not.
     */
    static isWindowAvailable() {
        return LangUtils.scriptExecute(function () {return Boolean(window);}, false);
    }
}
