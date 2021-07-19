var express = require('express');
var router = express.Router();
var startAt = new Date().toISOString();


//health check API
router.get('/health', function (req, res, next) {
  let commitID = "";
  res.status(200).json({
      app: 'techAlchemy:v1',
      tier: process.env.TIER,
      commitID,
      startAt
  });
});

module.exports = router;
