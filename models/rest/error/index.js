'use strict';
var response = {
    "error": {
        "errorCode": "ErrorCode",
        "errorMsg": "Error Message to be shown to end user"
    },
    "debug": {
        request: {},
        requestHeaders: {},
        jsonStackTrace: {}
    }      
};

module.exports.json = response;