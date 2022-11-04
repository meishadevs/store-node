const Region = require('../controller/region');

const regionApi = (router) => {
  // 获得省份列表
  router.get('/region/provinceList', (req, res, next) => {
    Region.getProvinceList(req, res, next);
  });

  // 获得市列表
  router.get('/region/cityList', (req, res, next) => {
    Region.getCityList(req, res, next);
  });

  // 获得区列表
  router.get('/region/districtList', (req, res, next) => {
    Region.getDistrictList(req, res, next);
  });
};

module.exports = regionApi;
