const userApi = require('./userApi');
const advisoryApi = require('./advisoryApi');
const menuApi = require('./menuApi');
const productApi = require('./productApi');
const regionApi = require('./regionApi');
const express = require('express');

const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

userApi(router);
advisoryApi(router);
menuApi(router);
productApi(router);
regionApi(router);

module.exports = router;

