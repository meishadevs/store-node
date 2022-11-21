const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  // 市 id
  id: Number,

  // 市名称
  cityName: String,

  // 市编码
  cityCode: String,

  // 省份编码
  provinceCode: String,

  // 创建人
  createBy: String,

  // 创建时间
  createTime: String,
});

citySchema.virtual('provinceList', {
  ref: 'province',
  localField: 'provinceCode',
  foreignField: 'provinceCode',
  justOne: false,
});

citySchema.index({ id: 1 });

citySchema.set('toObject', { virtuals: true });
citySchema.set('toJSON', { virtuals: true });

const City = mongoose.model('city', citySchema, 'city');

module.exports = City;
