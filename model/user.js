import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_name: String,
  password: String,
  id: Number,
  create_time: String,
  user: { type: String, default: '管理员' },
  status: Number, // 1:普通管理、 2:超级管理员
  avatar: { type: String, default: 'default.jpg' },
  city: String
});

userSchema.index({ id: 1 });

const User = mongoose.model('users', userSchema);

export default User;
