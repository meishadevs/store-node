# 电商项目服务端

基于 node.js、express、mongodb、mongoose 的电商项目服务端，整个项目为电商网项目提供登录、注册、商品展示、下单等功能的后端服务能力。

# 说明

> store-node 接口文档: [接口文档地址](https://github.com/meishadevs/store-node/blob/master/API.md) 

>  如果对您对此项目有兴趣，可以点 "Star" 支持一下 谢谢！ ^_^

>  或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

>  开发环境 windows 10、node.js 16.17.0、Mongodb 6.0.1

>  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

>  相关项目地址：[前端项目地址](https://github.com/meishadevs/store-vue) &nbsp; [后台管理系统项目地址](https://github.com/meishadevs/store-admin)

## API接口文档

接口文档地址：https://github.com/meishadevs/store-node/blob/master/API.md

## 技术栈

Node.js + Express + MongoDB + Mongoose + ES6

## 运行项目

```
# 将项目克隆到本地
https://github.com/meishadevs/store-node.git

# 进入 store-node 目录下
cd store-node

# 安装依赖
npm install

# 运行项目
npm run dev
```

## 数据库文件

数据库备份文件：[下载数据库文件](https://raw.githubusercontent.com/meishadevs/store-node/master/database/store.rar)

数据还原
```
# -h 数据库地址
# -d 数据库名称，数据文件的路径
mongorestore -h 192.168.10.178:27017 -d store F:\database
```

## 目录结构

```  
|── config                    // 配置文件
│   ├── allowApi.js           // 配置不需要 token 就可以访问的接口
│   ├── default.js            // 默认配置
│   ├── development.js        // 开发环境下的配置
│   └── tencentCos.js         // 腾讯云 COSS 对象存储相关配置
├── controller                // 处理中心，负责数据库的具体操作
|   |── advisory.js           // 咨询
│   ├── auth.js               // 权限认证
│   ├── banner.js             // 轮播图
│   ├── city.js               // 市
│   ├── district.js           // 区
│   ├── menu.js               // 菜单
│   ├── product.js            // 商品
│   ├── province.js           // 省份
│   ├── role.js               // 角色
│   └── user.js               // 用户
|── database                 
│   └── store.rar             // 数据库
|── middlewares               // 中间件
│   └── check.js              // 权限认证
|── model                     // 模型文件
|   |── advisory.js           // 咨询模型
│   ├── auth.js               // 权限认证模型
│   ├── banner.js             // 轮播图模型
│   ├── city.js               // 市模型
│   ├── district.js           // 区模型
│   ├── menu.js               // 菜单模型
│   ├── product.js            // 商品模型
│   ├── province.js           // 省份模型
│   ├── role.js               // 角色模型
│   └── user.js               // 用户模型
|── mongodb                
│   └── db.js                 // 数据库连接
|── prototype                 // 基础功能类
│   └── baseComponent.js      // 基础类
├── router                    // 路由配置
|   |── advisoryApi.js        // 咨询接口
│   ├── authApi.js            // 权限认证路由
│   ├── bannerApi.js          // 轮播图接口
│   ├── cityApi.js            // 市接口
│   ├── districtApi.js        // 区接口
│   ├── menuApi.js            // 菜单接口
│   ├── productApi.js         // 商品接口
│   ├── provinceApi.js        // 省份接口
│   ├── roleApi.js            // 角色接口
│   ├── userApi.js            // 用户接口
│   └── index.js              // 接口汇总
├── statics                   // 静态资源目录
├── .editorconfig             // 编辑器配置
├── .eslintignore             // 配置忽略 eslint 语法检查的文件
├── .eslintrc.js              // eslint 语法检查配置
├── .gitignore                // 配置忽略提交的文件
├── API.md                    // API 接口文档
├── app.js                    // 入口文件
├── ecosystem.config.js       // PM2 配置文件
├── package-lock.json        
├── package.json              // 配置文件
└── README.md                 // 说明文档
```

## 修改配置信息

可在 config\default.js 文件中修改数据库连接地址、端口号、默认密码、token 失效时间等配置信息
```
const allowApi = require('./allowApi');
const tencentCos = require('./tencentCos');

module.exports = {
  port: 8002,
  url: 'mongodb://localhost:27017/store',
  secretKey: 'store',
  expiresIn: '10h',
  apiList: allowApi,
  tencentCos: tencentCos,
  defaultPassword: "000000",
  session: {
    name: 'store',
    secret: 'store',
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000
    }
  }
};
```

可在 config\allowApi.js 文件中修改不需要配置 token 就能访问的接口
```
// 不需要 token 就能访问的 api 接口
module.exports = [
  {
    url: /^\/images\/.*/
  },
  '/user/login',
  '/user/register',
  '/advisory/list',
  '/advisory/count',
  '/product/lis',
  '/product/count',
  '/province/all',
  '/city/all',
  '/district/all',
  '/banner/publish_list'
];
```

可在 config\tencentCos.js 文件中修改腾讯云 COS 的配置信息
```
module.exports = {
  secretId: 'A**********************************O',
  secretKey: 'O**********************************J',
  bucket: 'store-1253560230',
  region: 'ap-guangzhou'
};
```
