# TechAlchemy
## _Get weather info and latest news on the go_

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

This API returns the latest news based on the searched keyword once user is logged in and weather in JSON format.

## Features

- signup- add new user
- login- login for existing user
- logout- logout current logged in user
- news- gets news from 3rd party api
- weather- gets weather info from 3rd party api

We are a small startup company which offers the precise and concise news and weather information
to our users. We are not news or weather agency that collects data. We filter the responses from 
various sources and show it on our mobile app.

## Tech

TechAlchemy uses a number of open projects to work properly:

- [node.js](https://nodejs.org/) - evented I/O for the backend
- [Express](https://expressjs.com/en/starter/installing.html) - fast node.js network app framework
- [Redis](https://www.npmjs.com/package//redis) -  high performance Node.js Redis client
- [axios](https://www.npmjs.com/package/axios#features) - Promise based HTTP client for the browser and node.js
- [bcrypt](https://www.npmjs.com/package/bcrypt) - A library to help you hash passwords
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - An implementation of JSON Web Tokens.
- [mysql2](https://www.npmjs.com/package/mysql2) - MySQL client for Node.js with focus on performance

Source code is uploaded to public [GitHub repository](https://github.com/sarthak281096/techAlchemy)


## Installation

- Step 1: Install [Node.js](https://nodejs.org/) version 10+
- Step 2: Install MySQL version 5.6+
- Step 3: Install Redis version 4.0.9+
- Step 4: Navigate to root of the project, update the MySQL, newsapi and weatherapi config according to the system being used in production.json, development.json and staging.json
- Step 5: Run the database schema inside dbSchema folder
- Step 6: Run npm install in root of the directory
- Step 7: Start the mysql server using command-->  sudo service mysql start
- Step 8: Start redis server using command--> redis-server
- Step 9: Run npm start command, this starts the project with production config and no debug logs, Incase debug logs are needed use the following command: TIER=production debug=* node app.js
- Step 10: server can be stopped by using npm stop command.

Postman collection: https://www.postman.com/collections/031fb4b693ec82873eed