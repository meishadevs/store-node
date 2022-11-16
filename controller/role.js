const RoleModel = require('../model/role');
const UserModel = require('../model/user');
const BaseComponent = require('../prototype/baseComponent');
const dtime = require('time-formater');
const formidable = require('formidable');

class Role extends BaseComponent {
  // 构造函数
  constructor() {
    super();
    this.getAllList = this.getAllList.bind(this);
    this.getPageList = this.getPageList.bind(this);
    this.getRoleDetail = this.getRoleDetail.bind(this);
    this.saveRoleData = this.saveRoleData.bind(this);
    this.deleteRoleInfo = this.deleteRoleInfo.bind(this);
  }

  // 获得所有角色列表数据
  async getAllList(req, res, next) {
    try {
      // 获得所有角色数据
      const roleList = await RoleModel.find({}, '-_id -menus -createBy -createTime -__v');

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
      const roleList = await RoleModel.find(queryCondition, '-_id -menus -__v')
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

  // 保存角色数据
  async saveRoleData(req, res, next) {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send(this.failMessage('表单信息错误'));
        return;
      }

      const { roleName, id = 0 } = fields;
      const { userId } = req.auth;

      try {
        if (!roleName) {
          throw new Error('角色名不能为空');
        }

        let roleInfo = {
          roleName,
          menus: []
        }

        // 根据角色名查找角色信息
        const role = await RoleModel.findOne({ roleName });

        // 获得用户信息
        const { userName } = await UserModel.findOne({ id: userId }, '-_id -password -__v').lean();

        // 生成角色 id，角色 id 是唯一的
        const roleId = await this.generateIdValue('roleId');

        // 编辑角色信息
        if (id) {
          await RoleModel.updateOne({ id }, { $set: roleInfo })
          res.send(this.successMessage('角色信息编辑成功'));
          // 新增角色信息
        } else {
          if (role) {
            res.send(this.failMessage('该角色已存在'));
            return
          }

          roleInfo = {
            ...roleInfo,
            id: roleId,
            createBy: userName,
            createTime: dtime().format('YYYY-MM-DD HH:mm:ss')
          }

          await RoleModel.create(roleInfo);
          res.send(this.successMessage('角色新增成功'));
        }

      } catch (err) {
        res.send(this.failMessage(err.message));
      }
    });
  }

  // 删除角色
  async deleteRoleInfo(req, res, next) {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send(this.failMessage('表单信息错误'));
        return;
      }

      const { roleId = 0 } = fields;

      try {
        if (!roleId) {
          throw new Error('角色id不能为空');
        }

        // 根据角色 id 查找角色信息
        const role = await UserModel.findOne({ id: roleId });

        // 根据角色 id 查找与角色对应的用户
        const userList = await UserModel.find({ roles: roleId });

        if (!role) {
          throw new Error('没有找到与id对应的角色信息');
        }

        if (userList.length) {
          throw new Error('该角色已分配给用户了，不能删除');
        }

        await RoleModel.findOneAndDelete({ id: roleId })
        res.send(this.successMessage('角色删除成功'));

      } catch (err) {
        res.send(this.failMessage(err.message));
        return;
      }
    });
  }
}

module.exports = new Role();
