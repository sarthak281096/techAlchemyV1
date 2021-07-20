const express = require('express');
const router = express.Router();
const weather = require('../controller/weather');

/* GET weather */
router.get('/', weather.get);

module.exports = router;