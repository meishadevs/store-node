const RoleModel = require('../model/role');
const BaseComponent = require('../prototype/baseComponent');

class Role extends BaseComponent {
  // 构造函数
  constructor() {
    super();
    this.getAllList = this.getAllList.bind(this);
    this.getPageList = this.getPageList.bind(this);
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
}

module.exports = new Role();
