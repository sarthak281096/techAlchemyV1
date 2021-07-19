let errorModel = require('../../models/rest/error').json;

function error(code, msg, request, headers, stackTrace) {
    errorModel.error.errorCode = code || 'e500';
    errorModel.error.errorMsg = msg || "Something Wrong I can feel it";
    if(process.env.DEBUG) {
        errorModel.debug.request = request;
        errorModel.debug.requestHeaders = headers;
        errorModel.debug.jsonStackTrace = stackTrace;
    } else {
        delete errorModel['debug'];
    }
    return errorModel
}

module.exports.error = error;
