# 接口文档

## 目录：

[注册](#注册)  
[登录](#登录)  
[获取当前用户信息](#获取当前用户信息)  
[退出登录](#退出登录)  
[获得用户数量](#获得用户数量)  
[获得用户列表](#获得用户列表)  
[获得用户详情](#获得用户详情)  
[保存用户信息](#保存用户信息)  
[修改用户状态](#修改用户状态)  
[重置用户密码](#重置用户密码)  
[删除用户信息](#删除用户信息)  
[获得所有角色](#获得所有角色)  
[获得商品数量](#获得商品数量)  
[获得商品列表](#获得商品列表)  
[获得省份列表](#获得省份列表)  
[获得市列表](#获得市列表)  
[获得区列表](#获得区列表)  
[获得咨询数量](#获得咨询数量)  
[获得咨询列表](#获得咨询列表)  
[获得菜单列表](#获得菜单列表)  

## 接口列表：

### 注册

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

### 登录

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
  "msg": "登录成功",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2Nzg5ODM4MSwiZXhwIjoxNjY3OTM0MzgxfQ.tGlVwKXxpFU4JFGIYnvJk3ASi9s8tPbmPSEfDcKQ-0k"
  }
}
```

### 获取当前用户信息

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
    "createTime": "2022-11-07",
    "roles": [
      1,
      2,
      3,
      4
    ],
    "id": 1,
    "roleList": [
      "销售",
      "运营人员",
      "管理员",
      "普通用户"
    ],
    "permissions": [
      "role",
      "user",
      "setting",
      "menu"
    ]
  }
}
```

### 退出登录

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

### 获得用户数量

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

### 获得用户列表

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
|pageSize      |N       |Number  |每页数据条数，默认展示 10 条 |
|pageNumber    |N       |Number  |当前页数，默认为第 1 页 |
|userName      |N       |Number  |用户名 |
|status      |N       |Number  |用户状态，1：启用，2：禁用 |
|roleId      |N       |Number  |角色id |

#### 返回示例：

```javascript
{
  "code": 200,
  "msg": "请求成功",
  "data": {
    "list": [
      {
        "id": 11,
        "userName": "test1024",
        "email": "test1024@163.com",
        "isAgree": 1,
        "status": 1,
        "roleNames": "客户",
        "createTime": "2022-11-11 11:45"
      },
      {
        "id": 6,
        "userName": "test",
        "email": "test@163.com",
        "isAgree": 1,
        "status": 0,
        "roleNames": "客户，管理员，销售",
        "createTime": "2022-11-11 11:38"
      }
      ....
    ],
    "count": 6
  }
}
```

### 获得用户详情

#### 请求URL:  
```
/user/detail
```

#### 请求方式: 
```
GET
```

#### 请求参数：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|userId      |Y       |Number  |用户id |

#### 返回示例：

```javascript
{
  "code": 200,
  "msg": "请求成功",
  "data": {
    "id": 6,
    "userName": "test",
    "email": "test@163.com",
    "isAgree": 1,
    "status": 1,
    "createTime": "2022-11-11 11:38:03",
    "roles": [
      2,
      1,
      3
    ]
  }
}
```

### 保存用户信息

#### 请求URL:  
```
/user/save
```

#### 请求方式: 
```
POST
```

#### 请求参数：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id      |N       |Number  |用户id，有值表示编辑用户信息，无值表示新增用户信息|
|userName      |Y       |String  |用户名 |
|roles      |Y       |Array  |所属角色，由角色 id 组成的数组 |
|email      |N       |String  |邮箱 |
|status      |Y       |Number  |用户状态，默认值为 0，表示禁用，1表示启用 |

#### 返回示例：

```javascript
{
  "code": 200,
  "msg": "用户信息新增成功"
}
```

### 修改用户状态

#### 请求URL:  
```
/user/change_status
```

#### 请求方式: 
```
POST
```

#### 请求参数：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|userId      |Y       |Number  |用户id |

#### 返回示例：

```javascript
{
  "code": 200,
  "msg": "用户启用成功"
}
```

### 重置用户密码

#### 请求URL:  
```
/user/reset_password
```

#### 请求方式: 
```
POST
```

#### 请求参数：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|userId      |Y       |Number  |用户id |

#### 返回示例：

```javascript
{
  "code": 200,
  "msg": "密码重置成功"
}
```

### 删除用户信息

#### 请求URL:  
```
/user/delete
```

#### 请求方式: 
```
POST
```

#### 请求参数：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|userId      |Y       |Number  |用户id |

#### 返回示例：

```javascript
{
  "code": 200,
  "msg": "用户删除成功"
}
```

### 获得所有角色

#### 请求URL:  
```
/role/all
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
    "list": [
      {
        "roleName": "管理员",
        "id": 1
      },
      {
        "id": 2,
        "roleName": "客户"
      },
      {
        "id": 4,
        "roleName": "测试"
      },
      ....
    ]
  }
}
```

### 获得商品数量

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

### 获得商品列表

#### 请求URL:  
```
/product/list
```

#### 请求方式: 
```
GET
```

#### 请求参数：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|pageSize      |N       |Number  |每页数据条数，默认展示 10 条 |
|pageNumber      |N       |Number  |当前页数，默认为第 1 页 |

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

### 获得省份列表

#### 请求URL:  
```
/region/provinceList
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
    "list": [
      {
        "provinceCode": 110000,
        "provinceName": "北京市"
      },
      {
        "provinceCode": 120000,
        "provinceName": "天津市"
      },
      {
        "provinceCode": 130000,
        "provinceName": "河北省"
      },
      ....
    ]
  }
}
```

### 获得市列表

#### 请求URL:  
```
/region/cityList
```

#### 请求方式: 
```
GET
```

#### 请求参数：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|provinceCode      |Y       |Number  |省份编码|

#### 返回示例：

```javascript
{
  "code": 200,
  "msg": "请求成功",
  "data": {
    "list": [
      {
        "cityCode": 360100,
        "cityName": "南昌市",
        "provinceCode": 360000
      },
      {
        "cityCode": 360200,
        "cityName": "景德镇市",
        "provinceCode": 360000
      },
      {
        "cityCode": 360300,
        "cityName": "萍乡市",
        "provinceCode": 360000
      },
     .....
    ]
  }
}
```

### 获得区列表

#### 请求URL:  
```
/region/DistrictList
```

#### 请求方式: 
```
GET
```

#### 请求参数：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|cityCode      |Y       |Number  |市编码|

#### 返回示例：

```javascript
{
  "code": 200,
  "msg": "请求成功",
  "data": {
    "list": [
      {
        "districtCode": 360501,
        "districtName": "市辖区",
        "cityCode": 360500
      },
      {
        "districtCode": 360502,
        "districtName": "渝水区",
        "cityCode": 360500
      },
      {
        "districtCode": 360521,
        "districtName": "分宜县",
        "cityCode": 360500
      }
    ]
  }
}
```

### 获得咨询数量

#### 请求URL:  
```
/advisory/count
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
    "count": 30
  }
}
```

### 获得咨询列表

#### 请求URL:  
```
/advisory/list
```

#### 请求方式: 
```
GET
```

#### 请求参数：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|pageSize      |N       |Number  |每页数据条数，默认展示 10 条 |
|pageNumber      |N       |Number  |当前页数，默认为第 1 页 |

#### 返回示例：

```javascript
{
  "code": 200,
  "msg": "请求成功",
  "data": {
    "list": [
      {
        "memberImage": "touxiang1.jpg",
        "memberName": "m***k",
        "memberGrade": "金星会员",
        "question": "还能再便宜点么？",
        "answer": "您好，现在已经是活动价格了。",
        "time": "11/5/2017 18:39:00"
      },
      {
        "memberImage": "touxiang2.jpg",
        "memberName": "世***8",
        "memberGrade": "木星会员",
        "question": "出售的商品是正品吗？",
        "answer": "您好，我们出售的所有商品均为正品，享受全国三包保修政策。",
        "time": "19/4/2017 21:11:00"
      },
      ....
    ],
    "count": 30
  }
}
```

### 获得菜单列表

#### 请求URL:  
```
/menu/list
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
    "list": [
      {
        "id": 1,
        "parentId": 0,
        "title": "系统设置",
        "url": "/setting",
        "permission": "setting",
        "icon": "",
        "sort": 1,
        "remark": "",
        "type": 0,
        "children": [
          {
            "id": 2,
            "parentId": 1,
            "title": "用户管理",
            "url": "/user",
            "permission": "user",
            "icon": "",
            "sort": 2,
            "remark": "",
            "type": 0,
            "children": []
          },
          {
            "id": 3,
            "parentId": 1,
            "title": "角色管理",
            "url": "/role",
            "permission": "role",
            "icon": "",
            "sort": 3,
            "remark": "",
            "type": 0,
            "children": []
          },
          {
            "id": 4,
            "parentId": 1,
            "title": "菜单管理",
            "url": "/menu",
            "permission": "menu",
            "icon": "",
            "sort": 4,
            "remark": "",
            "type": 0,
            "children": []
          }
        ]
      }
    ]
  }
}
```
