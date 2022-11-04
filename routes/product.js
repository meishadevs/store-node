const express = require('express');
const Product = require('../controller/product');

const router = express.Router();

router.get('/list', Product.getPageList);
router.get('/count', Product.getCount);

module.exports = router;
