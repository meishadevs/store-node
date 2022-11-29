const Product = require('../controller/product');

const productApi = (router) => {
  // 获得商品列表
  router.get('/product/list', (req, res, next) => {
    Product.getPageList(req, res, next);
  });

  // 获得商品数量
  router.get('/product/count', (req, res, next) => {
    Product.getCount(req, res, next);
  });
};

module.exports = productApi;
