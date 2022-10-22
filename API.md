# 接口文档

## 目录：

[1、注册](#1注册)<br/>
[2、登录](#2登录)<br/>
[3、获得用户数量](#3获得用户数量)<br/>

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

#### 参数类型：param

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|userName      |Y       |string  |用户名 |
|password      |Y       |string  |密码 |
|secondPassword      |Y       |string  |确认密码 |
|email      |Y       |string  |邮箱 |
|isAccept      |Y       |string  |是否同意服务协议，true：同意，false：不同意 |

#### 返回示例：

```javascript
{
    "code": 200,
    "message": "用户注册成功"
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

#### 参数类型：param

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|userName      |Y       |string  |用户名 |
|password      |Y       |string  |密码 |

#### 返回示例：

```javascript
{
    "code": 200,
    "message": "登录成功"
}
```

## 1、获得用户数量

#### 请求URL:  
```
/user/count
```

#### 请求方式: 
```
GET
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|

#### 返回示例：

```javascript
{
    "code": 200,
    "message": "请求成功",
    "data": {
        "count": 3
    }
}
```