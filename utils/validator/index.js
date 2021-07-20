var validator = require('./json-schema');

function jsonValidate(request, schema, logger) {
    try {
        logger.debug("Validating Request: ", request);
        var validation = validator.validate(request, schema);
        return validation;
    } catch(e) {
        logger.error(e);
    }
}
module.exports.validate = jsonValidate;