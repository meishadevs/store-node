# 接口文档

## 目录：

[1、注册](#1注册)  
[2、登录](#2登录)  
[3、获取当前用户信息](#3退出登录)  
[4、退出登录](#3退出登录)  
[5、获得用户数量](#4获得用户数量)  
[6、获得用户列表](#4获得用户列表)  
[7、获得商品数量](#4获得商品数量)  
[8、获得商品列表](#4获得商品列表)  

## 接口列表：

### 1、注册

#### 请求URL:  
```
/user/register
```

#### 请求方式: 
```
POST
```

#### 请求参数：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|userName      |Y       |String  |用户名 |
|password      |Y       |String  |密码 |
|secondPassword      |Y       |String  |确认密码 |
|email      |Y       |String  |邮箱 |
|isAgree      |Y       |Number  |是否同意注册协议，1：同意，0：不同意 |

#### 返回示例：

```javascript
{
  "code": 200,
  "msg": "用户注册成功"
}
```

### 2、登录

#### 请求URL:  
```
/user/login
```

#### 请求方式: 
```
POST
```

#### 请求参数：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|userName      |Y       |String  |用户名 |
|password      |Y       |String  |密码 |

#### 返回示例：

```javascript
{
  "code": 200,
  "msg": "登录成功"
}
```

### 3、获取当前用户信息

#### 请求URL:  
```
/user/info
```

#### 请求方式: 
```
GET
```

#### 请求参数：
无

#### 返回示例：

```javascript
{
  "code": 200,
  "msg": "请求成功",
  "data": {
    "userName": "meishadevs",
    "email": "meishadevs@gmail.com",
    "isAgree": 1,
    "createTime": "2022-10-24",
    "id": 4
  }
}
```

### 4、退出登录

#### 请求URL:  
```
/user/logout
```

#### 请求方式: 
```
POST
```

#### 请求参数：
无

#### 返回示例：

```javascript
{
  "code": 200,
  "msg": "退出成功"
}
```

### 5、获得用户数量

#### 请求URL:  
```
/user/count
```

#### 请求方式: 
```
GET
```

#### 请求参数：
无

#### 返回示例：

```javascript
{
  "code": 200,
  "msg": "请求成功",
  "data": {
    "count": 3
  }
}
```

### 6、获得用户列表

#### 请求URL:  
```
/user/list
```

#### 请求方式: 
```
GET
```

#### 请求参数：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|pageSize      |Y       |Number  |每页数据条数，默认展示 10 条 |
|pageNumber      |Y       |Number  |当前页数，默认为第 1 页 |

#### 返回示例：

```javascript
{
  "code": 200,
  "msg": "请求成功",
  "data": {
    "list": [
      {
        "userName": "fyt",
        "email": "fyt@163.com",
        "isAgree": 1,
        "createTime": "2022-10-24",
        "id": 6
      },
      {
        "userName": "tyy",
        "email": "tyy@163.com",
        "isAgree": 1,
        "createTime": "2022-10-24",
        "id": 5
      },
      {
        "userName": "meishadevs",
        "email": "meishadevs@gmail.com",
        "isAgree": 1,
        "createTime": "2022-10-24",
        "id": 4
      }
    ],
    "count": 3
  }
}
```

### 7、获得商品数量

#### 请求URL:  
```
/product/count
```

#### 请求方式: 
```
GET
```

#### 请求参数：
无

#### 返回示例：

```javascript
{
  "code": 200,
  "msg": "请求成功",
  "data": {
    "count": 54
  }
}
```

### 8、获得商品列表

#### 请求URL:  
```
/user/list
```

#### 请求方式: 
```
GET
```

#### 请求参数：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|pageSize      |Y       |Number  |每页数据条数，默认展示 10 条 |
|pageNumber      |Y       |Number  |当前页数，默认为第 1 页 |

#### 返回示例：

```javascript
{
  "code": 200,
  "msg": "请求成功",
  "data": {
    "list": [
      {
        "productImage": "https://img12.360buyimg.com/n7/jfs/t3196/295/4684591179/191025/4c57e3ca/5853a6d7N1c1d8ad7.jpg",
        "productName": "华为 HUAWEI P10",
        "productPrice": 3788,
        "commentNum": "2.1万"
      },
      {
        "productImage": "https://img14.360buyimg.com/n7/jfs/t3175/98/4506474928/251187/914831b7/5844f3a1N233450bb.jpg",
        "productName": "荣耀 畅玩5C",
        "productPrice": 1099,
        "commentNum": "29万"
      },
      .....
    ],
    "count": 54
  }
}
```

