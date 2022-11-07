const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  // 角色 id
  id: Number,

  // 角色名称
  roleName: String,

  // 给角色分配的菜单（权限）
  // 关联菜单集合，用于查询给角色分配的菜单
  menus: [{ 
    type: Number, 
    ref: 'menu' 
  }]
});

roleSchema.index({ id: 1 });

const Role = mongoose.model('role', roleSchema, 'role');

module.exports = Role;
