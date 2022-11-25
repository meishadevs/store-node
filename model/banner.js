const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  // 轮播图 id
  id: Number,

  // 轮播图名称
  bannerName: String,

  // 图片链接
  imageUrl: String,

  // 显示顺序
  sort: Number,

  // 关联的产品
  productId: Number,

  // 发布状态，1：已发布，0：未发布
  publishStatus: {
    type: Number,
    default: 0
  },

   // 创建人
   createBy: String,

  // 创建时间
  createTime: String
});

bannerSchema.index({ id: 1 });

const Banner = mongoose.model('banner', bannerSchema, 'banner');

module.exports = Banner;
