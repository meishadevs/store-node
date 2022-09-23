import path from 'path';
import chalk from 'chalk';
import express from 'express';
import config from 'config-lite';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import history from 'connect-history-api-fallback';

/* eslint-disable no-unused-vars */
import db from './mongodb/db.js';
import router from './routes/index.js';

// 创建 express 对象
const app = express();

// 针对所有请求
app.all('*', (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || '*';

  // 设置请求头
  res.header('Access-Control-Allow-Origin', allowOrigin);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Credentials', true); // 可以带cookies
  res.header('X-Powered-By', 'Express');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// 使用 cookie-parser 中间件，方便操作客户端中的 cookie 值
app.use(cookieParser());

// 使用 express-session 中间件，
app.use(session({
  name: config.session.name,
  secret: config.session.secret,
  resave: true,
  saveUninitialized: false,
  cookie: config.session.cookie,
  store: MongoStore.create({
    mongoUrl: config.url
  })
}));

// 配置路由
router(app);

app.use(history());

// 实现静态资源访问功能
// express.static 的参数为静态资源的存放目录
app.use(express.static(path.join(__dirname, 'statics')));

// 监听端口
app.listen(config.port, () => {
  console.log(
    chalk.green(`成功监听端口：${config.port}`)
  );
});
