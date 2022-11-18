const AdvisoryModel = require('../model/advisory');
const BaseComponent = require('../prototype/baseComponent');

class Advisory extends BaseComponent {
  constructor() {
    super();
    this.getPageList = this.getPageList.bind(this);
    this.getCount = this.getCount.bind(this);
  }

  // 获得咨询列表
  async getPageList(req, res, next) {
    const { pageSize = 10, pageNumber = 1 } = req.query;

    const offset = (pageNumber - 1) * pageSize;

    try {
      // 获得咨询列表
      const advisoryList = await AdvisoryModel
        .find({}, '-_id -id')
        .skip(Number(offset)).limit(Number(pageSize));

      // 获得咨询数量
      const advisoryCount = await AdvisoryModel.count();

      let data = {
        list: advisoryList,
        count: advisoryCount
      };

      res.send(this.successMessage(null, data));
    } catch (err) {
      res.send(this.failMessage(err.message));
    }
  }

  // 获得咨询数量
  async getCount(req, res, next) {
    try {
      // 获得咨询数量
      const advisoryCount = await AdvisoryModel.count();

      let data = {
        count: advisoryCount
      };

      res.send(this.successMessage(null, data));
    } catch (err) {
      res.send(this.failMessage(err.message));
    }
  }
}

module.exports = new Advisory();
