const MenuModel = require('../model/Menu');
const BaseComponent = require('../prototype/baseComponent');

class Menu extends BaseComponent {
  constructor() {
    super();
    this.getList = this.getList.bind(this);
    this.getPermissionList = this.getPermissionList.bind(this);
  }

  // 获得菜单列表
  async getList(req, res, next) {
    try {
      // 获得菜单列表
      // -_id 表示不显示 _id 字段
      // { sort: 1 } 表示根据 sort 值升序排列
      const menuList = await MenuModel.find({}, '-_id').sort({ sort: 1 }).lean();

      // 将菜单列表转成一颗树的结构
      const treeData = this.arrayToTree(menuList);

      let data = {
        list: treeData
      };

      res.send(this.successMessage(null, data));
    } catch (err) {
      res.send(this.failMessage('获取菜单列表失败'));
    }
  }

  // 获得权限列表
  async getPermissionList(req, res, next) {
    try {
      // 获得菜单列表
      // -_id 表示不显示 _id 字段
      // { sort: 1 } 表示根据 sort 值升序排列
      const permissionList = await MenuModel.find({}, '-_id -permission -url -icon -sort -type -remark').sort({ sort: 1 }).lean();

      // 将菜单列表转成一颗树的结构
      const treeData = this.arrayToTree(permissionList);

      let data = {
        list: treeData
      };

      res.send(this.successMessage(null, data));
    } catch (err) {
      res.send(this.failMessage('获取权限数据失败'));
    }
  }
}

module.exports = new Menu();
