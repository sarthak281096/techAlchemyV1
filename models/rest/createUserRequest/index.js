'use strict';
var request = {
    "email": "",
    "password": "",
    "name":""
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
        },
        "name": {
            "type": "string",
            "optional": false
        }
    }
};


module.exports.schema = schema;
module.exports.json = request;