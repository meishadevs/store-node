# 电商项目服务端

基于 node.js、express、mongodb、mongoose 的电商项目服务端，整个项目为电商网项目提供登录、注册、商品展示、下单等功能的后端服务能力。

# 说明

> store-node 接口文档: [接口文档地址](https://github.com/meishadevs/store-node/blob/master/API.md) 

>  如果对您对此项目有兴趣，可以点 "Star" 支持一下 谢谢！ ^_^

>  或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

>  开发环境 windows 10、nodejs 16.17.0、Mongodb 6.0.1

>  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

>  相关项目地址：[前端项目地址](https://github.com/meishadevs/store-vue) [后台管理系统项目地址](https://github.com/meishadevs/store-admin)

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
