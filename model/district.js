import mongoose from 'mongoose';

const districtSchema = new mongoose.Schema({
  districtName: String,
  districtCode: Number,
  cityCode: Number,
  id: Number
});

districtSchema.index({ id: 1 });

const District = mongoose.model('district', districtSchema, 'district');

export default District;
