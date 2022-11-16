const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  // 菜单 id
  id: Number,

  // 父级菜单 id
  parentId: Number,

  // 菜单标题
  title: String,

  // 菜单 url
  url: String,

  // 菜单权限
  permissions: String,

  // 菜单图标
  icon: String,

  // 排序
  sort: Number,

  // 备注
  remark: String,

  // 菜单类型
  type: Number,

  // 创建人
  createBy: String,

  // 创建时间
  createTime: String,
});

menuSchema.index({ id: 1 });

const Menu = mongoose.model('menu', menuSchema, 'menu');

module.exports = Menu;
