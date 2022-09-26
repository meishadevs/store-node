import IdModel from '../model/id';

export default class BaseComponent {
  constructor() {
    // id 列表
    this.idList = [
      'userId'
    ];
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
}
