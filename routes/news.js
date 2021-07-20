const express = require('express');
const router = express.Router();
const news = require('../controller/news');
var isauthenticated = require('../controller/isAuthenticated').isAuthenticated;

/* GET news */
router.get('/',isauthenticated, news.get);

module.exports = router;