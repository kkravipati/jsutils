import Logger from 'logger';

let registry = {
    date: '^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\\d\\d$',
    time: '^(1[0-2]|0[1-9]):[0-5][0-9]\s(AM|am|PM|pm)$',
    /* eslint-disable max-len */
    email: '^([a-zA-Z0-9_\\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$$',
    phone: '^\\d{3}[-]\\d{3}[-]\\d{4}$',
    extension: '^\\d{5}$',
    zip5: '^\\d{5}$',
    zip4: '^\\d{4}$',
    percentage: '^0$|^[1-9][0-9]?$|^100$'
};

export default class RegexpUtils {

    static test(regexp, text) {
        try {
            regexp = new RegExp(regexp);
            return (typeof text === undefined || text === null) ? false : regexp.test(text);
        } catch (error) {
            Logger.log(error, regexp, text);
            return false;
        }
    }

    static getRegexp(regexpKey) {
        return registry[regexpKey];
    }
}
