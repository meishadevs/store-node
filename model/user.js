const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // 用户 id
  id: Number,

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

  // 给用户分配的角色
  // 关联角色集合，用于查询给用户分配的角色
  roles: [{ 
    type: Number, 
    ref: 'role' 
  }]
});

userSchema.virtual('roleList', {
  ref: 'role',
  localField: 'roles',
  foreignField: 'id',
  justOne: false,
});

userSchema.index({ id: 1 });

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

const User = mongoose.model('user', userSchema, 'user');

module.exports = User;
