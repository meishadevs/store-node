# 电商项目服务端

基于 node.js、express、mongodb、mongoose 的电商项目服务端，整个项目为电商网项目提供登录、注册、商品展示、下单等功能的后端服务能力。

# 说明

> store-node 接口文档: [接口文档地址](https://github.com/meishadevs/store-node/blob/master/API.md) 

>  如果对您对此项目有兴趣，可以点 "Star" 支持一下 谢谢！ ^_^

>  或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

>  开发环境 windows 10、nodejs 16.17.0、Mongodb 6.0.1

>  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

>  相关项目地址：[前端项目地址](https://github.com/meishadevs/store-vue) &nbsp;&nbsp; [后台管理系统项目地址](https://github.com/meishadevs/store-admin)

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

|____database
| |____store.rar
|____API.md
|____statics
| |____images
| | |____banner2.jpg
| | |____banner3.jpg
| | |____banner1.jpg
| | |____banner4.jpg
| | |____advisoryimages
| | | |____touxiang26.jpg
| | | |____touxiang27.jpg
| | | |____touxiang19.jpg
| | | |____touxiang25.jpg
| | | |____touxiang30.jpg
| | | |____touxiang24.jpg
| | | |____touxiang18.jpg
| | | |____touxiang20.jpg
| | | |____touxiang21.jpg
| | | |____touxiang23.jpg
| | | |____touxiang22.jpg
| | | |____touxiang9.jpg
| | | |____touxiang8.jpg
| | | |____touxiang1.jpg
| | | |____touxiang3.jpg
| | | |____touxiang2.jpg
| | | |____touxiang6.jpg
| | | |____touxiang7.jpg
| | | |____touxiang5.jpg
| | | |____touxiang4.jpg
| | | |____touxiang13.jpg
| | | |____touxiang12.jpg
| | | |____touxiang10.jpg
| | | |____touxiang11.jpg
| | | |____touxiang15.jpg
| | | |____touxiang29.jpg
| | | |____touxiang28.jpg
| | | |____touxiang14.jpg
| | | |____touxiang16.jpg
| | | |____touxiang17.jpg
|____config
| |____allowApi.js
| |____development.js
| |____default.js
|____middlewares
| |____check.js
|____prototype
| |____baseComponent.js
|____mongodb
| |____db.js
|____.editorconfig
|____controller
| |____region.js
| |____advisory.js
| |____role.js
| |____user.js
| |____province.js
| |____menu.js
| |____product.js
|____README.md
|____.gitignore
|____package-lock.json
|____package.json
|____model
| |____district.js
| |____advisory.js
| |____role.js
| |____user.js
| |____city.js
| |____province.js
| |____id.js
| |____menu.js
| |____product.js
|____.eslintrc.js
|____.eslintignore
|____ecosystem.config.js
|____routes
| |____provinceApi.js
| |____productApi.js
| |____regionApi.js
| |____index.js
| |____menuApi.js
| |____roleApi.js
| |____userApi.js
| |____advisoryApi.js
|____app.js

