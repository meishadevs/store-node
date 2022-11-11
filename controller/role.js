const RoleModel = require('../model/role');
const BaseComponent = require('../prototype/baseComponent');

class Role extends BaseComponent {
  // 构造函数
  constructor() {
    super();
    this.getAllList = this.getAllList.bind(this);
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
}

module.exports = new Role();
