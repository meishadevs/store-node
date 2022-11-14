const UserModel = require('../model/user');
const RoleModel = require('../model/role');
const BaseComponent = require('../prototype/baseComponent');
const formidable = require('formidable');
const dtime = require('time-formater');
const jwt = require('jsonwebtoken');
const { secretKey, expiresIn, defaultPassword } = require('config-lite')(__dirname);

class User extends BaseComponent {
  // 构造函数
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.logout = this.logout.bind(this);
    this.getPageList = this.getPageList.bind(this);
    this.getUserCount = this.getUserCount.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.getUserDetail = this.getUserDetail.bind(this);
    this.saveUserData = this.saveUserData.bind(this);
    this.hangeUserStatus = this.changeUserStatus.bind(this);
  }

  // 注册
  async register(req, res, next) {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send(this.failMessage('表单信息错误'));
        return;
      }

      const { userName, password, secondPassword, email, isAgree } = fields;

      try {
        if (!userName) {
          throw new Error('用户名不能为空');
        } else if (!password) {
          throw new Error('密码不能为空');
        } else if (!secondPassword) {
          throw new Error('确认密码不能为空');
        } else if (password !== secondPassword) {
          throw new Error('两次输入的密码不一致');
        } else if (!parseInt(isAgree)) {
          throw new Error('请同意用户注册协议');
        }

        // 根据用户名查找用户信息
        const user = await UserModel.findOne({ userName });

        if (user) {
          throw new Error('该用户已存在');
        }

        // 生成用户 id，用户 id 是唯一的
        const userId = await this.generateIdValue('userId');

        // 对密码进行加密
        const newpassword = this.encryption(password);

        const newUser = {
          userName,
          password: newpassword,
          id: userId,
          email,
          roles: [4],
          status: 1,
          isAgree: parseInt(isAgree),
          createTime: dtime().format('YYYY-MM-DD HH:mm:ss')
        };

        // 保存用户信息
        await UserModel.create(newUser);

        res.send(this.successMessage('用户注册成功'));
      } catch (err) {
        res.send(this.failMessage(err.message));
        return;
      }
    });
  }

  // 登录
  async login(req, res, next) {
    // 创建 form 表单
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send(this.failMessage('表单信息错误'));
        return;
      }

      const { userName, password } = fields;

      try {
        if (!userName) {
          throw new Error('用户名不能为空');
        } else if (!password) {
          throw new Error('密码不能为空');
        }

        // 根据用户名，查找用户信息
        const user = await UserModel.findOne({ userName });

        // 对用户填写的密码加密
        const newpassword = this.encryption(password);

        if (!user) {
          throw new Error('用户不存在');
        } else if (newpassword.toString() !== user.password.toString()) {
          throw new Error('该用户已存在，密码输入错误');
        } else if (!user.status) {
          throw new Error('该用户已禁用');
        }

        // 生成 token
        // 第一个参数：用户信息对象
        // 第二个参数：加密秘钥
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: expiresIn });

        const result = {
          accessToken: token
        };

        res.send(this.successMessage('登录成功', result));

      } catch (err) {
        res.send(this.failMessage(err.message));
      }
    });
  }

  // 退出登录
  async logout(req, res, next) {
    try {
      res.send(this.successMessage('退出成功'));
    } catch (err) {
      res.send(this.failMessage('退出失败'));
    }
  }

  // 获得用户列表
  async getPageList(req, res, next) {
    let list = [];

    const { pageSize = 10, pageNumber = 1, userName = '', status } = req.query;

    const offset = (pageNumber - 1) * pageSize;

    // 查询条件
    let queryCondition = {};

    if (userName) {
      queryCondition = {
        ...queryCondition,
        userName
      }
    }

    if (status) {
      queryCondition = {
        ...queryCondition,
        status
      }
    }

    try {
      // 获得用户列表
      const userList = await UserModel.find(queryCondition, '-_id -password -__v')
        .sort({ createTime: 'desc' })
        .skip(Number(offset))
        .limit(Number(pageSize))
        .populate({
          path: 'roleList',
          select: 'roleName -_id'
        });

      // 遍历用户数据
      userList.map(item => {
        const { id, userName, email, isAgree, status, createTime, roleList } = item;

        // 获得为用户分配的角色
        const roleNames = roleList.map(role => role.roleName).join('，');

        list.push({
          id,
          userName,
          email,
          isAgree,
          status,
          roleNames,
          createTime: dtime(createTime).format('YYYY-MM-DD HH:mm')
        });
      });

      // 获得用户数量
      const userCount = await UserModel.find(queryCondition).count();

      let data = {
        list,
        count: userCount
      };

      res.send(this.successMessage(null, data));
    } catch (err) {
      res.send(this.failMessage(err.message));
    }
  }

  // 获得用户个数
  async getUserCount(req, res, next) {
    try {
      const count = await UserModel.count();
      res.send(this.successMessage(null, { count }));
    } catch (err) {
      res.send(this.failMessage(err.message));
    }
  }

  // 获得用户信息
  async getUserInfo(req, res, next) {
    const { userId } = req.auth;

    // 用户的所属角色
    let roleList = [];

    // 用户的权限
    let permissions = [];

    try {
      if (!userId || !Number(userId)) {
        throw new Error('获取用户信息失败');
      }

      // 获得用户信息
      let userInfo = await UserModel.findOne({ id: userId }, '-_id -password -__v').lean();


      // 根据用户 id 获得用户的所属角色 
      const roleInfo = await UserModel.aggregate([
        {
          $match: { id: userId }
        },
        {
          $lookup: {
            from: 'role',
            localField: 'roles',
            foreignField: 'id',
            as: 'roleList',
          }
        },
        {
          $project: {
            '_id': 0,
            'roleList.roleName': 1
          }
        }
      ]);

      // 根据角色 id 获得角色的权限
      const permissionInfo = await RoleModel.aggregate([
        {
          $match: { id: { $in: userInfo.roles } }
        },
        {
          $lookup: {
            from: 'menu',
            localField: 'menus',
            foreignField: 'id',
            as: 'permissionList',
          }
        },
        {
          $project: {
            '_id': 0,
            'permissionList.permission': 1
          }
        }
      ]);

      // 如果获取到了用户分配的角色
      if (roleInfo.length && roleInfo[0].roleList.length) {
        roleList = roleInfo[0].roleList.map(item => {
          return item.roleName;
        });
      }

      // 如果获取到了用户分配的权限
      if (permissionInfo.length && permissionInfo[0].permissionList.length) {
        permissionInfo.map(permission => {
          permission.permissionList.map(item => {
            permissions.push(item.permission);
          });
        });
      }

      userInfo = {
        ...userInfo,
        roleList,
        permissions
      }

      if (!userInfo) {
        throw new Error('未找到当前用户');
      } else {
        res.send(this.successMessage(null, userInfo));
      }
    } catch (err) {
      res.send(this.failMessage(err.message));
    }
  }

  //获得用户详情
  async getUserDetail(req, res, nex) {
    const { userId } = req.query;

    try {
      if (!userId) {
        throw new Error('用户id不能为空');
      }

      // 获得用户信息
      let userInfo = await UserModel.findOne({ id: userId }, '-_id -password -__v').lean();

      if (!userInfo) {
        throw new Error('未找到当前用户');
      } else {
        res.send(this.successMessage(null, userInfo));
      }
    } catch (err) {
      res.send(this.failMessage(err.message));
    }
  }

  // 保存用户数据
  async saveUserData(req, res, next) {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send(this.failMessage('表单信息错误'));
        return;
      }

      const { userName, email, status = 0, roles = [], id = 0 } = fields;

      try {
        if (!userName) {
          throw new Error('用户名不能为空');
        } else if (!roles.length) {
          throw new Error('所属角色不能为空');
        }

        let userInfo = {
          userName,
          email,
          status,
          roles
        }

        // 根据用户名查找用户信息
        const user = await UserModel.findOne({ userName });

        // 生成用户 id，用户 id 是唯一的
        const userId = await this.generateIdValue('userId');

        // 编辑用户信息
        if (id) {
          await UserModel.updateOne({ id }, { $set: userInfo })
          res.send(this.successMessage('用户信息编辑成功'));
          // 新增用户信息
        } else {
          if (user) {
            res.send(this.failMessage('该用户已存在'));
            return
          }

          userInfo = {
            ...userInfo,
            id: userId,
            isAgree: 1,
            password: this.encryption(defaultPassword),
            createTime: dtime().format('YYYY-MM-DD HH:mm:ss')
          }

          await UserModel.create(userInfo);
          res.send(this.successMessage('用户信息新增成功'));
        }

      } catch (err) {
        res.send(this.failMessage(err.message));
        return;
      }
    });
  }

  // 修改用户状态
  async changeUserStatus(req, res, next) {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send(this.failMessage('表单信息错误'));
        return;
      }

      const { status = 0, userId = 0 } = fields;

      try {
        if (!userId) {
          throw new Error('用户id不能为空');
        }

        // 根据用户 id 查找用户信息
        const user = await UserModel.findOne({ id: userId });

        if (!user) {
          throw new Error('没有找到与id对应的用户信息');
        }
      } catch (err) {
        res.send(this.failMessage(err.message));
        return;
      }
    });
  }
}

module.exports = new User();
