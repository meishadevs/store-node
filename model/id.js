const mongoose = require('mongoose');

const idSchema = new mongoose.Schema({
  // 用户 id
  userId: Number,

  // 角色 id
  roleId: Number,

  // 菜单 id
  menuId: Number
});

const Id = mongoose.model('id', idSchema, 'id');

/* eslint-disable handle-callback-err */
Id.findOne((err, data) => {
  if (!data) {
    const newIds = new Id({
      userId: 0,
      roleId: 0,
      menuId: 0
    });

    newIds.save();
  }
});

module.exports = Id;
