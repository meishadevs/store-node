const mongoose = require('mongoose');

const advisorySchema = new mongoose.Schema({
  // 咨询 id
  id: Number,

  // 用户名
  memberName: String,

  // 用户头像
  memberImage: String,

  // 用户等级
  memberGrade: String,

  // 问题
  question: String,

  // 回答
  answer: String,

  // 提问时间
  time: String
});

advisorySchema.index({ id: 1 });

const Advisory = mongoose.model('advisory', advisorySchema, 'advisory');

module.exports = Advisory;
