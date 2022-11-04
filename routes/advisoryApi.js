const Advisory = require('../controller/advisory');

const advisoryApi = (router) => {
  // 获得咨询列表
  router.get('/advisory/list', (req, res, next) => {
    Advisory.getPageList(req, res, next);
  });

  // 获得咨询数量
  router.get('/advisory/count', (req, res, next) => {
    Advisory.getCount(req, res, next);
  });
};

module.exports = advisoryApi;
