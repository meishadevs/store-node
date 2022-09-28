import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  cityName: String,
  cityCode: Number,
  provinceCode: Number,
  id: Number
});

citySchema.index({ id: 1 });

const City = mongoose.model('city', citySchema, 'city');

export default City;
