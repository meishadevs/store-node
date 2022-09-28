import express from 'express';
import Region from '../controller/region';

const router = express.Router();

router.get('/provinceList', Region.getProvinceList);
router.get('/cityList', Region.getCityList);
router.get('/districtList', Region.getDistrictList);

export default router;
