import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  // 市名称
  cityName: String,

  // 市编码
  cityCode: Number,

  // 省份编码
  provinceCode: Number,

  // 市 id
  id: Number
});

citySchema.index({ id: 1 });

const City = mongoose.model('city', citySchema, 'city');

export default City;
