const Menu = require('../controller/menu');

const menuApi = (router) => {
  // 获得菜单列表
  router.get('/menu/list', (req, res, next) => {
    Menu.getList(req, res, next);
  });

   // 获得权限列表
   router.get('/menu/permissions_list', (req, res, next) => {
    Menu.getPermissionList(req, res, next);
  });
};

module.exports = menuApi;
