import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // 用户名
  userName: String,

  // 密码
  password: String,

  // 邮箱
  email: String,

  // 创建时间
  createTime: String,
  id: Number
});

userSchema.index({ id: 1 });

const User = mongoose.model('user', userSchema, 'user');

export default User;
