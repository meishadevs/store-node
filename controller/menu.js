const MenuModel = require('../model/Menu');
const BaseComponent = require('../prototype/baseComponent');

class Menu extends BaseComponent {
  constructor() {
    super();
    this.getList = this.getList.bind(this);
  }

  // 获得菜单列表
  async getList(req, res, next) {
    try {
      // 获得菜单列表
      // -_id 表示不显示 _id 字段
      const menuList = await MenuModel.find({}, '-_id').sort({ id: -1 }).lean();

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
}

module.exports = new Menu();
