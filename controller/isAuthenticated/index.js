const redis = require("redis");
const client = redis.createClient();
const logger = require('../../handler/log');
const jwt = require('jsonwebtoken');
const errorHandler = require('../../utils/responder').error;


var isAuthenticated = function(req, res, next) {
    try{
        logger.debug('Inside isAuthenticated function ');
        const token =req.header('auth-token');
        if (!token){
            let err = errorHandler(400,
                "Access Denied",
                req.body, JSON.stringify(req.headers), ""
            );
            res.status(401).json(err);
        }
        else{
            const verified = jwt.verify(token, "e8217a32bbb0de0df64971f76d65329fba9104df376e1e5baf2bff8b98dea016594ef64095e8e3050147a95fc84150d21f7cf25a090b70d2f0ce4e9712a641de");
            req.user = verified;
            client.exists(`LOGOUT_${token}`, (err, resp)=>{
                if (err){
                    throw err;
                }else if (resp == 0){
                    next();
                }else {
                    let err = errorHandler(400,
                        "Token is logged out",
                        req.body, JSON.stringify(req.headers), ""
                    );
                    res.status(401).json(err);
                }
            })
        }
        
    } catch(error) {
        logger.error(error.stack);
        let err = errorHandler(400,
            "Invalid Token ",
            req.body, JSON.stringify(req.headers), error.stack
        );
        res.status(400).json(err);
    }
}
module.exports.isAuthenticated = isAuthenticated;