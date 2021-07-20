'use strict';
var request = {
    "email": "",
    "password": ""
}

var schema = {
    "type": "object",
    "additionalpProperties": true,
    "properties": {
        "email": {
            "type": "string",
            "optional": false
        },
        "password": {
            "type": "string",
            "optional": false
        }
    }
};


module.exports.schema = schema;
module.exports.json = request;