const userApi = require('./userApi');
const advisoryApi = require('./advisoryApi');
const menuApi = require('./menuApi');
const productApi = require('./productApi');
const regionApi = require('./regionApi');
const roleApi = require('./roleApi');
const provinceApi = require('./provinceApi');
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
roleApi(router);
provinceApi(router);

module.exports = router;

