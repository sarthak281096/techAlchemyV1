const logger = require('../../handler/log');
const errorHandler = require('../../utils/responder').error;
const axios = require('axios');
const responseModel = require('../../models/rest/weatherapiResponse').json;
const redis = require("redis");
const client = redis.createClient();
const crypto = require('crypto');
var weatherConfig = require('../../config/' + process.env.TIER + '.json').weatherapi;

var get = function(req, res) {
    try{
        logger.debug('Inside get function of news api call');
        let urlCall ='https://'+weatherConfig.endpoint+'?q='+weatherConfig.city+'&cnt=5&units=metric&appid='+weatherConfig.apikey;

        const hash = crypto.createHash('md5').update(urlCall).digest('hex');
        client.get(hash,(err, response)=>{
            if (err){
                throw err;
            }    
            if (response){
                logger.debug("getting response from cache");
                res.status(200).json(JSON.parse(response));
            }else{
                axios.get(urlCall)
                .then(resp => {
                    if (resp.data){
                        responseModel.count = resp.data.cnt;
                        responseModel.unit = "metric";
                        responseModel.location = weatherConfig.city;
                        if(resp.data.list && Array.isArray(resp.data.list)){
                            resp.data.list.forEach(e => {
                                let obj = {};
                                obj.date = e.dt_txt;
                                obj.main =e.weather[0].main;
                                obj.temp = e.main.temp;
                                responseModel.data.push(obj);
                            });
                        }
                    }
                    res.status(200).json(responseModel);  
                    client.set(hash,JSON.stringify(responseModel), 'EX', 60 * 60 * 24 ,(err, resp) =>{
                        if (err){
                            throw err;
                        }
                        logger.debug("cache set");
                    });
                })
                .catch(error => {
                    logger.error(error.stack);
                    let err = errorHandler(500,
                    "Exception caught",
                    data, JSON.stringify(req.headers), error.stack
                );
                    res.status(500).json(err);
                })
            }
        })
        
    } catch(error) {
        logger.error(error.stack);
        let err = errorHandler(500,"Exception caught",
            data, JSON.stringify(req.headers), error.stack
        );
        res.status(500).json(err);
    }

}

module.exports.get = get;