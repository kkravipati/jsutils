
export default class PromiseUtils {

    static getPromise(data) {
        return new Promise((resolve, reject) => {
            resolve(data);
        });
    }
}
