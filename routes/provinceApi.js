const Province = require('../controller/province');

const provinceApi = (router) => {
  // 获得所有省份数据
  router.get('/province/all', (req, res, next) => {
    Province.getAllList(req, res, next);
  });

  // 获得省份列表数据
  router.get('/province/list', (req, res, next) => {
    Province.getPageList(req, res, next);
  });

  // 获得省份详情
  router.get('/province/detail', (req, res, next) => {
    Province.getProvinceDetail(req, res, next);
  });

  // 保存省份数据
  router.post('/province/save', (req, res, next) => {
    Province.saveProvinceData(req, res, next);
  });

  // 删除省份
  router.post('/province/delete', (req, res, next) => {
    Province.deleteProvinceInfo(req, res, next);
  });
};

module.exports = provinceApi;
