const userApi = require('./userApi');
const express = require('express');

const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

userApi(router);

module.exports = router;

