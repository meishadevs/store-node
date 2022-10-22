import UserModel from '../model/user';
import BaseComponent from '../prototype/baseComponent';
import formidable from 'formidable';
import dtime from 'time-formater';

class User extends BaseComponent {
  // 构造函数
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.logout = this.logout.bind(this);
    this.getAllUser = this.getAllUser.bind(this);
    this.getUserCount = this.getUserCount.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  // 注册
  async register(req, res, next) {
    const form = new formidable.IncomingForm();

    form.parse(req, async(err, fields, files) => {
      if (err) {
        res.send(this.failMessage('表单信息错误'));
        return;
      }

      const { userName, password, secondPassword, email, isAccept } = fields;

      try {
        if (!userName) {
          throw new Error('用户名不能为空');
        } else if (!password) {
          throw new Error('密码不能为空');
        } else if (!secondPassword) {
          throw new Error('确认密码不能为空');
        } else if (password !== secondPassword) {
          throw new Error('两次输入的密码不一致');
        } else if (isAccept !== 'true') {
          throw new Error('请同意用户协议');
        }
      } catch (err) {
        res.send(this.failMessage(err.message));

        return;
      }

      try {
        const user = await UserModel.findOne({ userName });

        if (user) {
          res.send(this.failMessage('该用户已经存在'));
        } else {
          // 获得用户 id，用户 id 是唯一的
          const userId = await this.generateIdValue('userId');

          // 对密码进行加密
          const newpassword = this.encryption(password);

          const newUser = {
            userName,
            password: newpassword,
            id: userId,
            email,
            createTime: dtime().format('YYYY-MM-DD')
          };

          // 保存用户信息
          await UserModel.create(newUser);

          // 将用户 id 存储到 session 中
          req.session.userId = userId;

          res.send(this.successMessage('用户注册成功'));
        }
      } catch (err) {
        res.send(this.failMessage('用户注册失败'));
      }
    });
  }

  // 登录
  async login(req, res, next) {
    // 创建 form 表单
    const form = new formidable.IncomingForm();

    form.parse(req, async(err, fields, files) => {
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
      } catch (err) {
        res.send(this.failMessage(err.message));
        return;
      }

      // 对用户填写的密码加密
      const newpassword = this.encryption(password);

      try {
        const user = await UserModel.findOne({ userName });

        if (!user) {
          res.send(this.failMessage('用户不存在'));
        } else if (newpassword.toString() !== user.password.toString()) {
          res.send(this.failMessage('该用户已存在，密码输入错误'));
        } else {
          // 将用户 id 存储到 session 中
          req.session.userId = user.id;
          res.send(this.successMessage('登录成功'));
        }
      } catch (err) {
        res.send(this.failMessage('用户登录失败'));
      }
    });
  }

  // 退出登录
  async logout(req, res, next) {
    try {
      // 删除存储在 session 中的用户 id
      delete req.session.userId;
      res.send(this.successMessage('退出成功'));
    } catch (err) {
      res.send(this.failMessage('退出失败'));
    }
  }

  // 获得所有用户
  async getAllUser(req, res, next) {
    const { limit = 20, offset = 0 } = req.query;

    try {
      const allUser = await UserModel.find({}, '-_id -password')
        .sort({ id: -1 })
        .skip(Number(offset))
        .limit(Number(limit));

      res.send(this.successMessage(null, { list: allUser }));
    } catch (err) {
      res.send(this.failMessage('获取用户列表失败'));
    }
  }

  // 获得用户个数
  async getUserCount(req, res, next) {
    try {
      const count = await UserModel.count();
      res.send(this.successMessage(null, { count }));
    } catch (err) {
      res.send(this.failMessage('获取用户数量失败'));
    }
  }

  // 获得用户信息
  async getUserInfo(req, res, next) {
    // 获得 session 中的用户 id
    const userId = req.session.userId;

    if (!userId || !Number(userId)) {
      res.send(this.failMessage('获取用户信息失败'));
      return;
    }

    try {
      // 根据用户 id 查找用户信息
      const userInfo = await UserModel.findOne({ id: userId }, '-_id -__v -password');
      if (!userInfo) {
        throw new Error('未找到当前用户');
      } else {
        res.send(this.successMessage(null, userInfo));
      }
    } catch (err) {
      res.send(this.failMessage('获取用户信息失败'));
    }
  }
}

export default new User();
