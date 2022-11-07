const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  // 区 id
  id: Number,

  // 区名称
  districtName: String,

  // 区编码
  districtCode: Number,

  // 市编码
  cityCode: Number
});

districtSchema.index({ id: 1 });

const District = mongoose.model('district', districtSchema, 'district');

module.exports = District;
