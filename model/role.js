const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  // 角色 id
  id: Number,

  // 角色名称
  roleName: String,

  // 给角色分配的菜单（权限）
  menus: {
    type: Array,
    default: []
  }
});

userSchema.index({ id: 1 });

const Role = mongoose.model('role', userSchema, 'role');

module.exports = Role;
