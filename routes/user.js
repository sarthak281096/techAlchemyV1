var express = require('express');
var router = express.Router();
var user = require('../controller/user');
var isauthenticated = require('../controller/isAuthenticated').isAuthenticated;

/* CREATE user */
router.post('/signup', user.post);
router.post('/login', user.postLogin);
router.post('/logout',isauthenticated, user.postLogout);

module.exports = router;