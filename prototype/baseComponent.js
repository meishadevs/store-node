const crypto = require('crypto');
const IdModel = require('../model/id');

class BaseComponent {
  constructor() {
    // id 列表
    this.idList = [
      'userId',
      'roleId',
      'menuId',
      'provinceId',
      'cityId',
      'districtId',
      'bannerId'
    ];
  }

  /**
   * 加密
   * @param password 密码
   * @return
   */
  encryption(password) {
    const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
    return newpassword;
  }

  /**
   * Md5 加密
   * @param password 密码
   * @return
   */
  Md5(password) {
    const md5 = crypto.createHash('md5');
    return md5.update(password).digest('base64');
  }

  /**
   * 根据 id 类型，生成对应的 id 值
   * @param idType id 类型
   * @return
   */
  async generateIdValue(idType) {
    if (!this.idList.includes(idType)) {
      throw new Error('id类型错误');
    }

    try {
      // 查找 ids 集合中的 id 数据
      let idData = await IdModel.findOne();

      // 如果没有找到 id 数据
      if (!idData) {
        let idObject = {
          userId: 0,
          roleId: 0,
          menuId: 0,
          provinceId: 0,
          cityId: 0,
          districtId: 0,
          bannerId: 0
        };

        // 向 ids 集合中添加一条 id 数据
        await IdModel.create(idObject);
        idData = await IdModel.findOne();
      }

      // 给 id 对象中对应的 id 值加一，其目的是为了保证不同数据的 id 值唯一
      idData[idType]++;

      // 更新 id 数据
      await idData.save();
      return idData[idType];
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * 成功的消息
   * @param message 消息内容
   * @param data 返回的数据
   * @return
   */
  successMessage(message, data) {
    message = message || '请求成功';

    let result = {
      code: 200,
      msg: message
    };

    if (data) {
      result = {
        ...result,
        data
      };
    }

    return result;
  }

  /**
   * 失败的消息
   * @param message 消息内容
   * @return
   */
  failMessage(message, data) {
    message = message || '请求失败';

    let result = {
      code: 500,
      msg: message
    };

    if (data) {
      result = {
        ...result,
        data
      };
    }

    return result;
  }

  /**
   * 将数组转成树
   * @param array
   * @return
   */
  arrayToTree(array) {
    // 存放结果集
    const result = [];
    const map = {};

    // 遍历数组
    for (const item of array) {
      // 当前数组元素的 id
      const id = item.id;

      // 当前数组元素的父 id
      const parentId = item.parentId;

      // 把当前值加入map
      if (!map[id]) {
        map[id] = {
          children: []
        };
      }

      map[id] = {
        ...item,
        children: map[id]['children']
      };

      const treeItem = map[id];

      if (parentId === 0) {
        result.push(treeItem);
      } else {
        if (!map[parentId]) {
          map[parentId] = {
            children: []
          };
        }

        map[parentId].children.push(treeItem);
      }
    }

    return result;
  }
}

module.exports = BaseComponent;
