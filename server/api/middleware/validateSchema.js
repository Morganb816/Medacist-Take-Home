const Validator = require('jsonschema').Validator;
const v = new Validator();

/**
 * @name validateSchema
 * @description Creates a schema validator for the passed in schema (JSON Schema)
 * @param {object} schema JSON Schema to validate the request body against
 * @returns {Function<void>} Schema validator function
 */
function validateSchema(schema) {
    return function(req, res, next) {
        const validation = v.validate(req.body, schema);
        if (validation.errors.length > 0) {
            res.status(400).send('Invalid Data');
            return;
        }
        next();
    }
}

module.exports = validateSchema;
