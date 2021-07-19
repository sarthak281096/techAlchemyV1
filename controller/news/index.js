const logger = require('../../handler/log');
const errorHandler = require('../../utils/responder').error;
const axios = require('axios');
const url = require('url');
const responseModel = require('../../models/rest/newsapiResponse').json;
const redis = require("redis");
const client = redis.createClient();
const crypto = require('crypto');
const config = require('../../config/' + process.env.TIER + '.json');
const newsConfig = config.newsapi;


var get = function(req, res) {
    try{
        logger.debug('Inside get function of news api call');
        const queryObject = url.parse(req.url,true).query;
        let urlCall;
        if (queryObject.search){
            urlCall =newsConfig.endpoint+'?'+'q='+queryObject.search+'&country='+newsConfig.country+'&pageSize='+newsConfig.pagesize+'&apiKey='+newsConfig.apikey;
        }else {
            urlCall =newsConfig.endpoint+'?country='+newsConfig.country+'&pageSize='+newsConfig.pagesize+'&apiKey='+newsConfig.apikey;
        }

        
        const hash = crypto.createHash('md5').update(urlCall).digest('hex'); 
        client.get(hash,(err, resp)=>{
            if (err){
                throw err
            }if (resp){
                logger.debug("getting response from cache");
                res.status(200).json(JSON.parse(resp));
            }else{
                axios.get(urlCall)
                .then(resp => {
                    if (resp.data && resp.data.totalResults){
                        responseModel.count = resp.data.totalResults;
                        if(resp.data.articles && Array.isArray(resp.data.articles)){
                            resp.data.articles.forEach(e => {
                                let obj = {};
                                obj.headline = e.title;
                                obj.link =e.url;
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
                        data, JSON.stringify(req.headers), error.stack);
                    res.status(500).json(err);
                })

            }
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

module.exports.get = get;