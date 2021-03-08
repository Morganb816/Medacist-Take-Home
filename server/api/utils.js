/**
 * @name ErrorCode
 * @description Error Code is a class used in the Service Factory Function for describing errors
 * @property {string} type - type of error which occured.
 * @property {number} code - HTTP status code to send to the user if this error occured.
 * @property {string} message - Message to send to the user if this error occured.
 * @method emit - Throws a new error of this error codes "type".
 */
class ErrorCode {
    constructor(type, code, message) {
        this.type = type;
        this.code = code;
        this.message = message;
    }
    emit() {
        throw new Error(this.type);
    }
};

const DEFAULT_ERROR_MESSAGE = 'Internal Server Error';

/**
 * @name serviceFactory
 * @description Serivce Factory is  used to produce service functions.
 * It will wrap a function in neccesary boiler to make a sevice (i.e. error handling)
 * @param {Function} func - Service to wrap
 * @param {ErrorCode[]} errorCodes - Array of ErrorCode classes to handle any errors that may occur
 * @param {Function} customErrorHandler - Custom Error Handler to handle errors if desired.
 * @returns {Function}
 */
const serviceFactory = (func, errorCodes = [], customErrorHandler) => {
    return async (req, res, next) => {
        try {
            return await func(req, res, next);
        } catch (err) {
            console.log(err)
            if (customErrorHandler) {
                customErrorHandler(err, req, res, next);
                return;
            }
            let responded = false;
            errorCodes?.forEach(({type, code, message}) => {
                if (type === err.message) {
                    res.status(code).send(message);
                    responded = true;
                }
            });
            if (!responded) {
                res.status(500).send(DEFAULT_ERROR_MESSAGE);
            }
        }
    }
};

module.exports = {
    ErrorCode,
    serviceFactory
};