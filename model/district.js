import mongoose from 'mongoose';

const districtSchema = new mongoose.Schema({
  // 区名称
  districtName: String,

  // 区编码
  districtCode: Number,

  // 市编码
  cityCode: Number,

  // 区 id
  id: Number
});

districtSchema.index({ id: 1 });

const District = mongoose.model('district', districtSchema, 'district');

export default District;
