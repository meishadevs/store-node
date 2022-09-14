import mongoose from 'mongoose';
import config from 'config-lite';

//连接数据库
mongoose.connect(config.url, {
  useNewUrlParser: true
});

//监听数据库连接状态
mongoose.connection.once('open', () => {
  console.log('数据库连接成功……')
})

mongoose.connection.once('close', () => {
  console.log('数据库断开……')
});