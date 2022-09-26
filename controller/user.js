import UserModel from '../model/user';
import BaseComponent from '../prototype/baseComponent';
import crypto from 'crypto';
import formidable from 'formidable';
import dtime from 'time-formater';

class User extends BaseComponent {
  // 构造函数
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.encryption = this.encryption.bind(this);
  }

  // 注册
  async register(req, res, next) {
    const form = new formidable.IncomingForm();

    form.parse(req, async(err, fields, files) => {
      if (err) {
        res.send({
          code: 150,
          message: '表单信息错误'
        });

        return;
      }

      const { userName, password, secondPassword, email } = fields;

      try {
        if (!userName) {
          throw new Error('用户名不能为空');
        } else if (!password) {
          throw new Error('密码不能为空');
        } else if (!secondPassword) {
          throw new Error('确认密码不能为空');
        } else if (password !== secondPassword) {
          throw new Error('两次输入的密码不一致');
        }
      } catch (err) {
        res.send({
          code: 150,
          message: err.message
        });

        return;
      }

      try {
        const user = await UserModel.findOne({ userName });

        if (user) {
          res.send({
            code: 150,
            message: '该用户已经存在'
          });
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

          req.session.userId = userId;

          res.send({
            code: 200,
            message: '注册用户成功'
          });
        }
      } catch (err) {
        console.log('注册用户失败', err);
        res.send({
          code: 150,
          message: '注册用户失败'
        });
      }
    });
  }

  // 登录
  async login(req, res, next) {
    // 创建 form 表单
    const form = new formidable.IncomingForm();

    form.parse(req, async(err, fields, files) => {
      if (err) {
        res.send({
          code: 200,
          message: '表单信息错误'
        });
        return;
      }

      const { user_name, password } = fields;

      try {
        if (!user_name) {
          throw new Error('用户名参数错误');
        } else if (!password) {
          throw new Error('密码参数错误');
        }
      } catch (err) {
        console.log(err.message, err);
        res.send({
          code: 150,
          message: err.message
        });
        return;
      }

      const newpassword = this.encryption(password);

      try {
        const user = await UserModel.findOne({ user_name });

        if (!user) {
          res.send({
            code: 150,
            success: '用户不存在'
          });
        } else if (newpassword.toString() !== user.password.toString()) {
          res.send({
            code: 150,
            message: '该用户已存在，密码输入错误'
          });
        } else {
          req.session.user_id = user.id;
          res.send({
            code: 200,
            success: '登录成功'
          });
        }
      } catch (err) {
        console.log('用户登录失败', err);
        res.send({
          code: 150,
          message: '用户登录失败'
        });
      }
    });
  }

  // 退出登录
  async singout(req, res, next) {
    try {
      delete req.session.user_id;
      res.send({
        code: 200,
        success: '退出成功'
      });
    } catch (err) {
      console.log('退出失败', err);
      res.send({
        code: 150,
        message: '退出失败'
      });
    }
  }

  // 获得所有用户
  async getAllUser(req, res, next) {
    const { limit = 20, offset = 0 } = req.query;

    try {
      const allUser = await UserModel.find({}, '-_id -password').sort({ id: -1 }).skip(Number(offset)).limit(Number(limit));
      res.send({
        code: 200,
        data: allUser
      });
    } catch (err) {
      console.log('获取用户列表失败', err);
      res.send({
        code: 200,
        message: '获取用户列表失败'
      });
    }
  }

  // 获得用户个数
  async getUserCount(req, res, next) {
    try {
      const count = await UserModel.count();
      res.send({
        code: 200,
        count
      });
    } catch (err) {
      console.log('获取用户数量失败', err);
      res.send({
        code: 150,
        message: '获取用户数量失败'
      });
    }
  }

  // 获得用户信息
  async getUserInfo(req, res, next) {
    const user_id = req.session.user_id;
    if (!user_id || !Number(user_id)) {
      res.send({
        code: 200,
        message: '获取用户信息失败'
      });
      return;
    }
    try {
      const info = await UserModel.findOne({ id: user_id }, '-_id -__v -password');
      if (!info) {
        throw new Error('未找到当前用户');
      } else {
        res.send({
          code: 200,
          data: info
        });
      }
    } catch (err) {
      res.send({
        code: 150,
        message: '获取用户信息失败'
      });
    }
  }

  // 加密
  encryption(password) {
    const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
    return newpassword;
  }

  Md5(password) {
    const md5 = crypto.createHash('md5');
    return md5.update(password).digest('base64');
  }
}

export default new User();
