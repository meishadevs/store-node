const User = require('../controller/user');

const userApi = (router) => {
  // 登录
  router.post('/user/login', (req, res, next) => {
    User.login(req, res, next);
  });

  // 注册
  router.post('/user/register', (req, res, next) => {
    User.register(req, res, next);
  });

  // 退出登录
  router.post('/user/logout', (req, res, next) => {
    User.logout(req, res, next);
  });

  // 获得用户列表
  router.get('/user/list', (req, res, next) => {
    User.getPageList(req, res, next);
  });

  // 获得用户数量
  router.get('/user/count', (req, res, next) => {
    User.getUserCount(req, res, next);
  });

  // 获得用户信息
  router.get('/user/info', (req, res, next) => {
    User.getUserInfo(req, res, next);
  });

   // 获得用户详情
   router.get('/user/detail', (req, res, next) => {
    User.getUserDetail(req, res, next);
  });

  // 保存用户数据
  router.post('/user/save', (req, res, next) => {
    User.saveUserData(req, res, next);
  });
};

module.exports = userApi;
