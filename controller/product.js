const ProductModel = require('../model/product');
const BaseComponent = require('../prototype/baseComponent');

class Product extends BaseComponent {
  constructor() {
    super();
    this.getPageList = this.getPageList.bind(this);
    this.getCount = this.getCount.bind(this);
  }

  // 获得带分页的商品列表数据
  async getPageList(req, res, next) {
    const { pageSize = 10, pageNumber = 1 } = req.query;

    const offset = (pageNumber - 1) * pageSize;

    try {
      // 获得商品列表
      // -_id 表示不显示 _id 字段
      const productList = await ProductModel.find({}, '-_id -id')
        .sort({ id: -1 })
        .skip(Number(offset))
        .limit(Number(pageSize));

      // 获得商品数量
      const productCount = await ProductModel.count();

      let data = {
        list: productList,
        count: productCount
      };

      res.send(this.successMessage(null, data));
    } catch (err) {
      res.send(this.failMessage('获取商品列表失败'));
    }
  }

  // 获得商品数量
  async getCount(req, res, next) {
    try {
      const productCount = await ProductModel.count();

      res.send(this.successMessage(null, { count: productCount }));
    } catch (error) {
      res.send(this.failMessage('获得商品数量失败'));
    }
  }
}

module.exports = new Product();
