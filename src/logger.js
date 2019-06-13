import LangUtils from 'lang-utils';

export default class Logger {
    static log(...msg) {
        if (LangUtils.isObjectLike(console) && LangUtils.isFunction(console.log)) {
            console.log(...msg);
        } else if (LangUtils.isFunction(print)) { // to support nashorn engine
            print(...msg);
        }
    }
}
