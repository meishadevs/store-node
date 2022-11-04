const Advisory = require('../controller/menu');

const menuApi = (router) => {
  // 获得菜单列表
  router.get('/menu/list', (req, res, next) => {
    Advisory.getPageList(req, res, next);
  });
};

module.exports = menuApi;
