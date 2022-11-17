const MenuModel = require('../model/Menu');
const UserModel = require('../model/user');
const RoleModel = require('../model/role');
const BaseComponent = require('../prototype/baseComponent');
const dtime = require('time-formater');
const formidable = require('formidable');

class Menu extends BaseComponent {
  constructor() {
    super();
    this.getTreeList = this.getTreeList.bind(this);
    this.getPermissionList = this.getPermissionList.bind(this);
    this.saveMenuData = this.saveMenuData.bind(this);
    this.deleteMenuInfo = this.deleteMenuInfo.bind(this);
  }

  // 获得树形状结构的菜单列表数据
  async getTreeList(req, res, next) {
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
      let permissionList = await MenuModel.find({}, '-_id -permissions -url -icon -sort -type -remark -createBy -createTime').sort({ sort: 1 }).lean();

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

  // 获得菜单详情
  async getMenuDetail(req, res, nex) {
    const { menuId } = req.query;

    try {
      if (!menuId) {
        throw new Error('菜单id不能为空');
      }

      // 获得菜单信息
      let menuInfo = await MenuModel.findOne({ id: menuId }, '-_id -__v').lean();

      if (!menuInfo) {
        throw new Error('未找到当前菜单');
      } else {
        res.send(this.successMessage(null, menuInfo));
      }
    } catch (err) {
      res.send(this.failMessage(err.message));
    }
  }

  // 保存菜单数据
  async saveMenuData(req, res, next) {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send(this.failMessage('表单信息错误'));
        return;
      }

      const { userId } = req.auth;
      const { id = 0, title, type = 0, parentId = 0, url, sort = 1, permissions, icon } = fields;

      try {
        if (!title) {
          throw new Error('菜单名称不能为空');
        } else if (!permissions) {
          throw new Error('权限不能为空');
        }

        let menuInfo = {
          id,
          title,
          type,
          parentId,
          url,
          sort,
          permissions,
          icon
        }

        // 根据菜单名称查找菜单信息
        const menu = await MenuModel.findOne({ title });

        // 获得用户信息
        const { userName } = await UserModel.findOne({ id: userId }, '-_id -password -__v').lean();

        // 生成菜单 id，菜单 id 是唯一的
        const menuId = await this.generateIdValue('menuId');

        // 编辑菜单信息
        if (id) {
          await MenuModel.updateOne({ id }, { $set: menuInfo })
          res.send(this.successMessage('菜单信息编辑成功'));
          // 新增角色信息
        } else {
          if (menu) {
            res.send(this.failMessage('该菜单已存在'));
            return
          }

          menuInfo = {
            ...menuInfo,
            id: menuId,
            createBy: userName,
            createTime: dtime().format('YYYY-MM-DD HH:mm:ss')
          }

          await MenuModel.create(menuInfo);
          res.send(this.successMessage('菜单新增成功'));
        }

      } catch (err) {
        res.send(this.failMessage(err.message));
      }
    });
  }

  // 删除菜单
  async deleteMenuInfo(req, res, next) {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send(this.failMessage('表单信息错误'));
        return;
      }

      const { menuId = 0 } = fields;

      try {
        if (!menuId) {
          throw new Error('菜单id不能为空');
        }

        // 根据菜单 id 查找菜单信息
        const menu = await MenuModel.findOne({ id: menuId });

        // 根据菜单 id 查找与菜单对应的角色
        const roleList = await RoleModel.find({ menus: menuId });

        if (!menu) {
          throw new Error('没有找到与id对应的菜单信息');
        }

        if (roleList.length) {
          throw new Error('该菜单已分配给角色了，不能删除');
        }

        await MenuModel.findOneAndDelete({ id: menuId });
        await MenuModel.deleteMany({ parentId: menuId });
        
        res.send(this.successMessage('菜单删除成功'));

      } catch (err) {
        res.send(this.failMessage(err.message));
      }
    });
  }
}

module.exports = new Menu();
