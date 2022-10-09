import crypto from 'crypto';
import IdModel from '../model/id';

export default class BaseComponent {
  constructor() {
    // id 列表
    this.idList = [
      'userId'
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
          userId: 0
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
   * @returns
   */
  successMessage(message, data) {
    message = message || '请求成功';

    let result = {
      code: 200,
      message
    };

    if (data) {
      result.data = data;
    }

    return result;
  }

  /**
   * 失败的消息
   * @param message 消息内容
   * @returns
   */
  failMessage(message) {
    return {
      code: 500,
      message
    };
  }
}
