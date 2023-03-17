const express = require('express');
const router = express.Router();

// test connection to server
router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

// setup and connect to api routes
const apiRouter = require('./api');
router.use('/api', apiRouter);

module.exports = router;