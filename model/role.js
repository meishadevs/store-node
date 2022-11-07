const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  // 角色名称
  roleName: String,

  // 角色 id
  id: Number
});

userSchema.index({ id: 1 });

const Role = mongoose.model('role', userSchema, 'role');

module.exports = Role;
