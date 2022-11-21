const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  // 区 id
  id: Number,

  // 区名称
  districtName: String,

  // 区编码
  districtCode: String,

  // 市编码
  cityCode: String,

  // 创建人
  createBy: String,

  // 创建时间
  createTime: String,
});

districtSchema.virtual('cityList', {
  ref: 'city',
  localField: 'cityCode',
  foreignField: 'cityCode',
  justOne: false,
});


districtSchema.index({ id: 1 });

districtSchema.set('toObject', { virtuals: true });
districtSchema.set('toJSON', { virtuals: true });

const District = mongoose.model('district', districtSchema, 'district');

module.exports = District;
