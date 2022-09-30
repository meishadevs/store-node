import AdvisoryModel from '../model/advisory';
import BaseComponent from '../prototype/baseComponent';

class Advisory extends BaseComponent {
  constructor() {
    super();
    this.getPageList = this.getPageList.bind(this);
  }

  // 获得咨询列表数据
  async getPageList(req, res, next) {
    try {
      // 获得咨询列表
      const advisoryList = await AdvisoryModel.find({}, '-_id -id');

      // 获得咨询数量
      const advisoryCount = await AdvisoryModel.count();

      let data = {
        list: advisoryList,
        count: advisoryCount
      };

      res.send(this.successMessage(null, data));
    } catch (err) {
      res.send(this.failMessage('获取商品列表失败'));
    }
  }
}

export default new Advisory();
