const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  // 市 id
  id: Number,

  // 市名称
  cityName: String,

  // 市编码
  cityCode: Number,

  // 省份编码
  provinceCode: Number
});

citySchema.index({ id: 1 });

const City = mongoose.model('city', citySchema, 'city');

module.exports = City;
