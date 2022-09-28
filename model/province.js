import mongoose from 'mongoose';

const provinceSchema = new mongoose.Schema({
  provinceName: String,
  provinceCode: Number,
  id: Number
});

provinceSchema.index({ id: 1 });

const Province = mongoose.model('province', provinceSchema, 'province');

export default Province;
