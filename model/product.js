const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // 商品 id
  id: Number,

  // 商品名称
  productName: String,

  // 商品图片连接
  productImage: String,

  // 商品价格
  productPrice: Number,

  // 商品评论数
  commentNum: String
});

productSchema.index({ id: 1 });

const Product = mongoose.model('product', productSchema, 'product');

module.exports = Product;
