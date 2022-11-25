const Banner = require('../controller/banner');

const bannerApi = (router) => {
  // 获得轮播图列表
  router.get('/banner/list', (req, res, next) => {
    Banner.getPageList(req, res, next);
  });

  // 获得轮播图详情
  router.get('/banner/detail', (req, res, next) => {
    Banner.getBannerDetail(req, res, next);
  });

  // 修改轮播图的发布状态
  router.post('/banner/publish', (req, res, next) => {
    Banner.changePublishStatus(req, res, next);
  });

  // 保存轮播图信息
  router.post('/banner/save', (req, res, next) => {
    Banner.saveBannerData(req, res, next);
  });

  // 删除轮播图
  router.post('/banner/delete', (req, res, next) => {
    Banner.deleteBannerData(req, res, next);
  });
};

module.exports = bannerApi;
