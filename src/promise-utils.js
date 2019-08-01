/**
 * Promise related dev utilities
 * @module PromiseUtils
 */

export default class PromiseUtils {
    /**
     * Create a new promise with given data
     *
     * @param {*} data          Promise result data.
     * @return {Promise}        Dumy promise with given data.
     */
    static getPromise(data) {
        return new Promise((resolve, reject) => {
            resolve(data);
        });
    }
}
