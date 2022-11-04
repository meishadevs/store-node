import MenuModel from '../model/Menu';
import BaseComponent from '../prototype/baseComponent';

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
      const menuList = await MenuModel.find({}, '-_id').sort({ id: -1 });

      let data = {
        list: menuList
      };

      res.send(this.successMessage(null, data));
    } catch (err) {
      res.send(this.failMessage('获取商品列表失败'));
    }
  }
}

export default new Menu();
