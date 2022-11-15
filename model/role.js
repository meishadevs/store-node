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
  }],

  // 创建人
  createBy: String,

  // 创建时间
  createTime: String,
});

roleSchema.index({ id: 1 });

const Role = mongoose.model('role', roleSchema, 'role');

module.exports = Role;
