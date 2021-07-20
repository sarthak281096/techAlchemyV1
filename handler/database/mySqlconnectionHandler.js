const mysql = require('mysql2');
function mySqlConnector() {

    this.connect = function(mySqlConfig, logger, callback) {

        if (typeof callback !== 'function') {
            logger.error("Invalid callback type");
            return "Invalid callback type";
        }

        const connection = mysql.createPool({
            host: mySqlConfig['url'],
            port: mySqlConfig['port'],
            user: mySqlConfig['user'],
            password: mySqlConfig['password'],
            database: mySqlConfig['database'],
            connectionLimit: mySqlConfig['connectionLimit'],
            maxPreparedStatements: 500,
            waitForConnections: true,
            queueLimit: 0
        });

        callback(null, connection);
    };
}

module.exports = mySqlConnector;