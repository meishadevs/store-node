const express = require('express');
const Menu = require('../controller/menu');

const router = express.Router();

router.get('/list', Menu.getList);

module.exports = router;
