const express = require('express');
const Region = require('../controller/region');

const router = express.Router();

router.get('/provinceList', Region.getProvinceList);
router.get('/cityList', Region.getCityList);
router.get('/districtList', Region.getDistrictList);

module.exports = router;
