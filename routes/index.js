const userApi = require('./userApi');
const advisoryApi = require('./advisoryApi');
const menuApi = require('./menuApi');
const productApi = require('./productApi');
const roleApi = require('./roleApi');
const provinceApi = require('./provinceApi');
const cityApi = require('./cityApi');
const districtApi = require('./districtApi');
const express = require('express');

const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

userApi(router);
advisoryApi(router);
menuApi(router);
productApi(router);
roleApi(router);
provinceApi(router);
cityApi(router);
districtApi(router);

module.exports = router;

