const util = require('util');
function queryHandler(connectionPool, query, params, logger, callback) {

    if (typeof callback !== 'function') {
        logger.error("Invalid callback type");
        return "Invalid callback type";
    }

    logger.debug("Database Query : ",query);
    logger.debug("Params : ",params);
    try {
    connectionPool.query(query, params,
        function(err, res, fields) {
            if (err) {
                logger.error(err);
                callback(err, null);
            } else {
                logger.debug("Query Result:",JSON.stringify(res));
                callback(null, res);
            }
        });    
    } catch (err){
        callback(err, null);
    }
    
}

module.exports = util.promisify(queryHandler);