const City = require('../controller/city');

const cityApi = (router) => {
  // 获得所有市数据
  router.get('/city/all', (req, res, next) => {
    City.getAllList(req, res, next);
  });

  // 获得市列表数据
  router.get('/city/list', (req, res, next) => {
    City.getPageList(req, res, next);
  });

  // 获得市详情
  router.get('/city/detail', (req, res, next) => {
    City.getCityDetail(req, res, next);
  });

  // 保存市数据
  router.post('/city/save', (req, res, next) => {
    City.saveCityData(req, res, next);
  });

  // 删除市
  router.post('/city/delete', (req, res, next) => {
    City.deleteCityInfo(req, res, next);
  });
};

module.exports = cityApi;
