const Role = require('../controller/role');

const roleApi = (router) => {

  // 获得所有角色列表数据
  router.get('/role/all', (req, res, next) => {
    Role.getAllList(req, res, next);
  });

  // 获得角色列表数据
  router.get('/role/list', (req, res, next) => {
    Role.getPageList(req, res, next);
  });

   // 获得角色详情
   router.get('/role/detail', (req, res, next) => {
    Role.getRoleDetail(req, res, next);
  });
  
  // 保存角色数据
  router.post('/role/save', (req, res, next) => {
    Role.saveRoleData(req, res, next);
  });
};

module.exports = roleApi;
