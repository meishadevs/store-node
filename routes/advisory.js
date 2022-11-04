const express = require('express');
const Advisory = require('../controller/Advisory');

const router = express.Router();

router.get('/list', Advisory.getPageList);
router.get('/count', Advisory.getCount);

module.exports = router;
