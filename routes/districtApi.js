const District = require('../controller/district');

const districtApi = (router) => {
  // 获得所有区数据
  router.get('/district/all', (req, res, next) => {
    District.getAllList(req, res, next);
  });

  // 获得区列表数据
  router.get('/district/list', (req, res, next) => {
    District.getPageList(req, res, next);
  });

  // 获得区详情
  router.get('/district/detail', (req, res, next) => {
    District.getDistrictDetail(req, res, next);
  });

  // 保存区数据
  router.post('/district/save', (req, res, next) => {
    District.saveDistrictData(req, res, next);
  });

  // 删除区
  router.post('/district/delete', (req, res, next) => {
    District.deleteDistrictInfo(req, res, next);
  });
};

module.exports = districtApi;
