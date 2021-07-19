//Get Tier of application
process.env.TIER = process.env.TIER || 'production';
if (process.env.TIER == "development" || process.env.NODE_ENV == "testing") {
    process.env.DEBUG = process.env.DEBUG || 'app,express:router,express:application,info';
}

var express = require('express');
var config = require('./config/' + process.env.TIER + '.json');
var mySqlConfig = config.mysql;
var dbConnector = require('./handler/database/mySqlconnectionHandler');
var dbQueryHandler = require('./handler/database/queryHandler');
var logger = require('./handler/log');
var healthCheck = require('./routes/healthCheck');
const user = require('./routes/user');
const news = require('./routes/news');
const weather = require('./routes/weather');
const { use } = require('./routes/healthCheck');


//initiate Database pool
dbConnector = new dbConnector();

var mySqlWriteInstance;
dbConnector.connect(mySqlConfig.read, logger,
    function (err, res) {
        if (err !== null) {
            return err;
        }
        mySqlWriteInstance = res;
    }
);

var mySqlReadInstance;
dbConnector.connect(mySqlConfig.write, logger,
    function (err, res) {
        if (err !== null) {
            return err;
        }
        mySqlReadInstance = res;
    }
);
var app = express();

/* database connection are set in express app
use req.app.get('dbWrite') for fetching the write pool */
app.set('dbRead', mySqlReadInstance);
app.set('dbWrite', mySqlWriteInstance);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/', healthCheck);
app.use('/api/user', user);
app.use('/api/news', news);
app.use('/api/weather',weather);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var error = new Error('Are you lost?');
  error.status = 404;
  error.description = 'Resource Not found';
  res.status(404).json({
    error
  })
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(500).json({
    err
  })
});

process.on('exit', function(code) {
  console.log('Cleaning up ...');
  require('./cleanup')(app);
  console.log('Exiting !!!');
});

app.set('env', process.env.NODE_ENV);
app.set('port', process.env.PORT || 8080);
app.set('debug', process.env.DEBUG);
app.set('version', process.env.VERSION);

var server = app.listen(app.get('port'), function() {
  console.log('Application started on port ' + server.address().port);
});

process.on('uncaughtException', function(error) {
  console.log("UNCAUGHT EXCEPTION : ", JSON.stringify(error))
  console.log({
      title: 'error',
      error: error,
      message: error.message,
      trace: error.stack
  });
  process.exit(1);
});

process.on('SIGINT', function() {
  console.log('gotta exit - SIGINT');
  process.exit(0);
});