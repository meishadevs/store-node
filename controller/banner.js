const UserModel = require('../model/user');
const BannerModel = require('../model/banner');
const BaseComponent = require('../prototype/baseComponent');
const formidable = require('formidable');
const dtime = require('time-formater');

class Banner extends BaseComponent {
  // 构造函数
  constructor() {
    super();
    this.getPageList = this.getPageList.bind(this);
    this.getBannerDetail = this.getBannerDetail.bind(this);
    this.saveBannerData = this.saveBannerData.bind(this);
    this.deleteBannerData = this.deleteBannerData.bind(this);
  }

  // 获得轮播图列表
  async getPageList(req, res, next) {
    let list = [];

    const { pageSize = 10, pageNumber = 1, bannerName } = req.query;

    const offset = (pageNumber - 1) * pageSize;

    // 查询条件
    let queryCondition = {};

    if (bannerName) {
      queryCondition = {
        ...queryCondition,
        bannerName: { $regex: bannerName }
      }
    }

    try {
      // 获得轮播图列表
      const bannerList = await BannerModel.find(queryCondition, '-_id -__v')
        .sort({ sort: 'desc' })
        .skip(Number(offset))
        .limit(Number(pageSize));

      // 获得轮播图数量
      const bannerCount = await BannerModel.find(queryCondition).count();

      let data = {
        list: bannerList,
        count: bannerCount
      };

      res.send(this.successMessage(null, data));
    } catch (err) {
      res.send(this.failMessage(err.message));
    }
  }

  // 获得轮播图详情
  async getBannerDetail(req, res, nex) {
    const { bannerId } = req.query;

    try {
      if (!bannerId) {
        throw new Error('轮播图id不能为空');
      }

      // 获得轮播图信息
      const bannerInfo = await BannerModel.findOne({ id: bannerId }, '-_id -__v').lean();

      if (!bannerInfo) {
        throw new Error('未找到轮播图信息');
      } else {
        res.send(this.successMessage(null, bannerInfo));
      }
    } catch (err) {
      res.send(this.failMessage(err.message));
    }
  }

  // 保存轮播图
  async saveBannerData(req, res, next) {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send(this.failMessage('表单信息错误'));
        return;
      }

      const { userId } = req.auth;
      const { bannerName, imageUrl, publishStatus = 0, topStatus = 0, sort = 1, id = 0 } = fields;

      try {
        if (!bannerName) {
          throw new Error('轮播图名称不能为空');
        } else if(!imageUrl) {
          throw new Error('轮播图片不能为空');
        }

        let bannerInfo = {
          bannerName,
          imageUrl,
          publishStatus,
          topStatus,
          sort
        }

        // 根据轮播图名称查找轮播图信息
        const banner = await BannerModel.findOne({ bannerName });
        
        // 获得用户信息
        const { userName } = await UserModel.findOne({ id: userId }, '-_id -password -__v').lean();

        // 生成轮播图 id，轮播图 id 是唯一的
        const bannerId = await this.generateIdValue('bannerId');

        // 获得轮播图中排序最大值
        const { maxSort } = (await BannerModel.aggregate([{"$group":{"_id": {}, "maxSort": {"$max": "$sort"}}}]))[0];
        
        // 获得轮播图中排序最小值
        const { minSort } = (await BannerModel.aggregate([{"$group":{"_id": {}, "minSort": {"$min": "$sort"}}}]))[0];

        // 如果选择了置顶
        if(topStatus) {
          bannerInfo = {
            ...bannerInfo,
            sort: maxSort + 1
          }
        } else {
          bannerInfo = {
            ...bannerInfo,
            sort: minSort - 1
          }
        }

        // 编辑轮播图信息
        if (id) {
          await BannerModel.updateOne({ id }, { $set: bannerInfo })
          res.send(this.successMessage('轮播图信息编辑成功'));
          // 新增轮播图信息
        } else {
          if (banner) {
            res.send(this.failMessage('该轮播图已存在'));
            return
          }

          bannerInfo = {
            ...bannerInfo,
            id: bannerId,
            createBy: userName,
            createTime: dtime().format('YYYY-MM-DD HH:mm:ss')
          }

          await BannerModel.create(bannerInfo);
          res.send(this.successMessage('轮播图信息新增成功'));
        }

      } catch (err) {
        res.send(this.failMessage(err.message));
        return;
      }
    });
  }

  // 删除轮播图
  async deleteBannerData(req, res, next) {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send(this.failMessage('表单信息错误'));
        return;
      }

      const { bannerId = 0 } = fields;

      try {
        if (!bannerId) {
          throw new Error('轮播图id不能为空');
        }

        // 根据轮播图 id 查找轮播图信息
        const banner = await BannerModel.findOne({ id: bannerId });

        if (!banner) {
          throw new Error('没有找到与id对应的轮播图信息');
        }

        await BannerModel.findOneAndDelete({ id: bannerId })
        res.send(this.successMessage('轮播图信息删除成功'));
      } catch (err) {
        res.send(this.failMessage(err.message));
        return;
      }
    });
  }
}

module.exports = new Banner();
