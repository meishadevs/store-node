const RoleModel = require('../model/role');
const BaseComponent = require('../prototype/baseComponent');

class Role extends BaseComponent {
  // 构造函数
  constructor() {
    super();
    this.getAllList = this.getAllList.bind(this);
    this.getPageList = this.getPageList.bind(this);
    this.getRoleDetail = this.getRoleDetail.bind(this);
  }

  // 获得所有角色列表数据
  async getAllList(req, res, next) {
    try {
      // 获得所有角色数据
      const roleList = await RoleModel.find({}, '-_id -menus -password -__v');

      let data = {
        list: roleList
      };

      res.send(this.successMessage(null, data));
    } catch (err) {
      console.log("err:", err);
      res.send(this.failMessage('获取所有角色列表数据失败'));
    }
  }

  // 获得角色列表
  async getPageList(req, res, next) {
    const { pageSize = 10, pageNumber = 1, roleName = '' } = req.query;

    const offset = (pageNumber - 1) * pageSize;

    // 查询条件
    let queryCondition = {};

    if (roleName) {
      queryCondition = {
        ...queryCondition,
        roleName
      }
    }

    try {
      // 获得角色列表
      const roleList = await RoleModel.find(queryCondition, '-_id -__v')
        .sort({ createTime: 'desc' })
        .skip(Number(offset))
        .limit(Number(pageSize));

      // 获得角色数量
      const roleCount = await RoleModel.find(queryCondition).count();

      let data = {
        list: roleList,
        count: roleCount
      };

      res.send(this.successMessage(null, data));
    } catch (err) {
      res.send(this.failMessage(err.message));
    }
  }

  // 获得角色详情
  async getRoleDetail(req, res, nex) {
    const { roleId } = req.query;

    try {
      if (!roleId) {
        throw new Error('角色id不能为空');
      }

      // 获得角色信息
      let roleInfo = await RoleModel.findOne({ id: roleId }, '-_id -__v').lean();

      if (!roleInfo) {
        throw new Error('未找到当前角色');
      } else {
        res.send(this.successMessage(null, roleInfo));
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
}

module.exports = new Role();
