const UserModel = require('../model/user');
const DistrictModel = require('../model/district');
const BaseComponent = require('../prototype/baseComponent');
const dtime = require('time-formater');
const formidable = require('formidable');

class District extends BaseComponent {
  // 构造函数
  constructor() {
    super();
    this.getAllList = this.getAllList.bind(this);
    this.getPageList = this.getPageList.bind(this);
    this.getDistrictDetail = this.getDistrictDetail.bind(this);
    this.saveDistrictData = this.saveDistrictData.bind(this);
    this.deleteDistrictInfo = this.deleteDistrictInfo.bind(this);
  }

  // 获得所有区列表数据
  async getAllList(req, res, next) {
    const { cityCode } = req.query;

    try {
      let districtList = [];
      
      if (cityCode) {
        districtList = await DistrictModel.find({ cityCode }, '-_id -__v -id -createBy -createTime');
      }

      let data = {
        list: districtList
      };

      res.send(this.successMessage(null, data));
    } catch (err) {
      res.send(this.failMessage(err.message));
    }
  }

  // 获得区列表
  async getPageList(req, res, next) {
    const { pageSize = 10, pageNumber = 1, districtName, districtCode, cityCode } = req.query;

    const offset = (pageNumber - 1) * pageSize;

    // 查询条件
    let queryCondition = {};

    let list = [];

    if (districtName) {
      queryCondition = {
        ...queryCondition,
        districtName: { $regex: districtName }
      }
    }

    if (districtCode) {
      queryCondition = {
        ...queryCondition,
        districtCode: { $regex: districtCode }
      }
    }

    if (cityCode) {
      queryCondition = {
        ...queryCondition,
        cityCode
      }
    }

    try {
      // 获得区列表
      const districtList = await DistrictModel.find(queryCondition, '-_id')
        .sort({ createTime: 'desc' })
        .skip(Number(offset))
        .limit(Number(pageSize))
        .lean()
        .populate({
          path: 'cityList',
          select: '-id -createBy -createTime -_id -__v',
          populate: {
            path: 'provinceList',
            select: '-_id'
          }
        });

      districtList.map(item => {
        const { id, districtCode, districtName, createBy, createTime, cityList } = item;

        list.push({
          id,
          districtCode,
          districtName,
          cityName: cityList.length ? cityList[0].cityName : '',
          provinceName: cityList.length ? cityList[0].provinceList[0].provinceName : '',
          createBy,
          createTime
        });
      });

      // 获得区数量
      const districtCount = await DistrictModel.find(queryCondition).count();

      let data = {
        list,
        count: districtCount
      };

      res.send(this.successMessage(null, data));
    } catch (err) {
      res.send(this.failMessage(err.message));
    }
  }

  // 获得区详情
  async getDistrictDetail(req, res, nex) {
    const { districtId = 0 } = req.query;

    try {
      if (!districtId) {
        throw new Error('区id不能为空');
      }

      // 获得区信息
      let districtInfo = await DistrictModel.findOne({ id: districtId }, '-_id -createBy -createTime -__v')
        .lean()
        .populate({
          path: 'cityList',
          select: '-id -createBy -createTime -_id -__v',
          populate: {
            path: 'provinceList',
            select: '-_id'
          }
        });

      if (!districtInfo) {
        throw new Error('未找到与id对应的区信息');
      } else {
        const { cityName } = districtInfo.cityList[0];
        const { provinceName, provinceCode } = districtInfo.cityList[0].provinceList[0];

        districtInfo = {
          ...districtInfo,
          cityName,
          provinceName,
          provinceCode
        };

        delete districtInfo.cityList;

        res.send(this.successMessage(null, districtInfo));
      }
    } catch (err) {
      res.send(this.failMessage(err.message));
    }
  }

  // 保存区数据
  async saveDistrictData(req, res, next) {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send(this.failMessage('表单信息错误'));
        return;
      }

      const { userId } = req.auth;
      const { cityCode, districtName, districtCode, id = 0 } = fields;

      try {
        if (!cityCode) {
          throw new Error('市编码不能为空');
        } else if (!districtName) {
          throw new Error('区名称不能为空');
        } else if (!districtCode) {
          throw new Error('区编码不能为空');
        }

        let districtInfo = {
          districtName,
          districtCode,
          cityCode,
        }

        // 根据区名称查找区信息
        const districtFromName = await DistrictModel.findOne({ districtName });

        // 根据区编码查找区信息
        const districtFromCode = await DistrictModel.findOne({ districtCode });

        // 获得用户信息
        const { userName } = await UserModel.findOne({ id: userId }, '-_id -password -__v').lean();

        // 生成区 id，区 id 是唯一的
        const districtId = await this.generateIdValue('districtId');

        // 编辑区信息
        if (id) {
          await DistrictModel.updateOne({ id }, { $set: districtInfo })
          res.send(this.successMessage('区编辑成功'));
          // 新增区信息
        } else {
          if (districtFromName) {
            throw new Error('区名称已存在');
          }

          if (districtFromCode) {
            throw new Error('区编码已存在');
          }

          districtInfo = {
            ...districtInfo,
            id: districtId,
            createBy: userName,
            createTime: dtime().format('YYYY-MM-DD HH:mm:ss')
          }

          await DistrictModel.create(districtInfo);
          res.send(this.successMessage('区新增成功'));
        }

      } catch (err) {
        res.send(this.failMessage(err.message));
      }
    });
  }

  // 删除区
  async deleteDistrictInfo(req, res, next) {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send(this.failMessage('表单信息错误'));
        return;
      }

      const { districtId = 0 } = fields;

      try {
        if (!districtId) {
          throw new Error('区id不能为空');
        }

        // 根据区 id 查找区信息
        const district = await DistrictModel.findOne({ id: districtId });

        if (!district) {
          throw new Error('没有找到与id对应的区信息');
        }

        await DistrictModel.findOneAndDelete({ id: districtId })
        res.send(this.successMessage('区删除成功'));

      } catch (err) {
        res.send(this.failMessage(err.message));
        return;
      }
    });
  }
}

module.exports = new District();
