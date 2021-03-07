/**
 * @name Storable
 * @description Class to extend from to allow for firestore storage of the class.
 * @method getStorable Creates a firestore storable version of this instance
 */
class Storable {
    constructor(...dontStore) {
        this.dontStore = dontStore;
    }
    getStorable() {
        const storable = Object.keys(this).reduce((storable, nextParam) => {
            if (this.dontStore.includes(nextParam) || nextParam === 'dontStore') {
                return storable;
            }
            return {...storable, [nextParam]: this[nextParam]}
        }, {});
        return storable;
    }
    getData() {
        return Object.keys(this).reduce((storable, nextParam) => {
            if (nextParam === 'dontStore') {
                return storable;
            }
            return {...storable, [nextParam]: this[nextParam]}
        }, {});
    }
};

module.exports = Storable;