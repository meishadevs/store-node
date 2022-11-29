const Menu = require('../controller/menu');

const menuApi = (router) => {
  // 获得树形状结构的菜单列表数据
  router.get('/menu/tree_list', (req, res, next) => {
    Menu.getTreeList(req, res, next);
  });

  // 获得权限列表
  router.get('/menu/permissions_list', (req, res, next) => {
    Menu.getPermissionList(req, res, next);
  });

  // 获得菜单详情
  router.get('/menu/detail', (req, res, next) => {
    Menu.getMenuDetail(req, res, next);
  });

  // 保存菜单信息
  router.post('/menu/save', (req, res, next) => {
    Menu.saveMenuData(req, res, next);
  });

  // 删除菜单
  router.post('/menu/delete', (req, res, next) => {
    Menu.deleteMenuInfo(req, res, next);
  });
};

module.exports = menuApi;
