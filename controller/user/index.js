const logger = require('../../handler/log');
const postSchema = require('../../models/rest/createUserRequest').schema;
const postLoginSchema = require('../../models/rest/loginRequest').schema;
const validate = require('../../utils/validator').validate;
const errorHandler = require('../../utils/responder').error;
const queryHandler = require('../../handler/database/queryHandler');
const responseModel = require('../../models/rest/createUserResponse').json;
const loginResponseModel = require('../../models/rest/loginResponse').json;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const redis = require("redis");
const client = redis.createClient();

var post = function(req, res) {
    try{
        logger.debug('Inside post function of createUser');
        let data = req.body;
        const isRequestValid = validate(data, postSchema, logger);
        if (!isRequestValid.valid) {
            logger.error(isRequestValid);

            let err = errorHandler(400,
                isRequestValid.errors.map(
                    (validation, i) =>
                        (i + 1) + ". " + validation.property + ": " +
                        validation.message
                ).join("; "),
                data, JSON.stringify(req.headers), {}
            );
            res.status(400).json(err);
            return;
        }
        let query = `INSERT INTO user(email, password, name) 
            values (?,?,?)`;
        const pswd = data.password;
        bcrypt.hash(pswd,12)
        .then(hashedPswd => {
            let params = [data.email, hashedPswd, data.name];
            return queryHandler(req.app.get('dbWrite'), query, params, logger)
            .then((response)=>{
            logger.debug('Response from database');
            responseModel.status = 'success';
            responseModel.userId = response.insertId;
            res.status(200).json(responseModel);
        })
        })
        .catch((error)=>{
            logger.error('Error from database', error)
            let err = errorHandler(500,
                "Exception caught",
                data, JSON.stringify(req.headers), error.stack
            );
            res.status(500).json(err);
        })

    } catch(error) {
        logger.error(error.stack);
        let err = errorHandler(500,
            "Exception caught",
            data, JSON.stringify(req.headers), error.stack
        );
        res.status(500).json(err);
    }
}


var postLogin = function(req, res) {
    try{
        logger.debug('Inside postLogin function of createUser');
        let data = req.body;
        const isRequestValid = validate(data, postLoginSchema, logger);
        if (!isRequestValid.valid) {
            logger.error(isRequestValid);

            let err = errorHandler(400,
                isRequestValid.errors.map(
                    (validation, i) =>
                        (i + 1) + ". " + validation.property + ": " +
                        validation.message
                ).join("; "),
                data, JSON.stringify(req.headers), {}
            );
            res.status(400).json(err);
            return;
        }
        let query = `SELECT password from user where email = ?`;
        let params = [data.email];
        queryHandler(req.app.get('dbRead'), query, params, logger)
        .then((response)=>{
            if(response.length == 0){
                logger.debug('No Matching Email found');
                loginResponseModel.status = 'failed';
                loginResponseModel.access = 'invalide email';
                res.status(403).json(loginResponseModel);
            } 
            else {
                bcrypt.compare(data.password, response[0].password)
                .then(doMatch => {
                    if(doMatch){
                        logger.debug('Response from database');
                        loginResponseModel.status = 'success';
                        loginResponseModel.access = 'granted';
                        const token = jwt.sign({_email: data.email},"e8217a32bbb0de0df64971f76d65329fba9104df376e1e5baf2bff8b98dea016594ef64095e8e3050147a95fc84150d21f7cf25a090b70d2f0ce4e9712a641de",{expiresIn:'2h'});
                        res.header('auth-token', token);
                        res.status(200).json(loginResponseModel);
                    }else{
                        logger.debug('Response from database');
                        loginResponseModel.status = 'failed';
                        loginResponseModel.access = 'invalid password';
                        res.status(403).json(loginResponseModel);
                    }
                })
            }
        })
        .catch((error)=>{
            logger.error('Error from database', error)
            let err = errorHandler(500,
                "Exception caught",
                data, JSON.stringify(req.headers), error.stack
            );
            res.status(500).json(err);
        })

    } catch(error) {
        logger.error(error.stack);
        let err = errorHandler(500,
            "Exception caught",
            data, JSON.stringify(req.headers), error.stack
        );
        res.status(500).json(err);
    }
}

var postLogout = function(req, res) {
    try{
        logger.debug('Inside postLogin function of createUser');
        const token =req.header('auth-token');
        client.set(`LOGOUT_${token}`, true, 'EX', 60 * 60 * 24 ,(err, resp) =>{
            if (err){
                throw err;
            }
            res.status(200).json({
                "status": "success",
                "access": "revoked"
            });
        });

    } catch(error) {
        logger.error(error.stack);
        let err = errorHandler(500,
            "Exception caught",
            data, JSON.stringify(req.headers), error.stack
        );
        res.status(500).json(err);
    }
}
module.exports.post = post;
module.exports.postLogin = postLogin;
module.exports.postLogout = postLogout;