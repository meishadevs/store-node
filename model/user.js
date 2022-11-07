const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // 用户名
  userName: String,

  // 密码
  password: String,

  // 邮箱
  email: String,

  // 是否同意用户协议
  isAgree: Number,

  // 创建时间
  createTime: String,

  // 所属角色
  roles: {
    type: Array,
    default: []
  },

  // 用户 id
  id: Number
});

userSchema.index({ id: 1 });

const User = mongoose.model('user', userSchema, 'user');

module.exports = User;
