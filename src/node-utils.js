import LangUtils from 'lang-utils';

export default class NodeUtils {
    static isWindowAvailable() {
        return LangUtils.scriptExecute(function () {return Boolean(window);}, false);
    }
}
