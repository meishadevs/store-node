const UserModel = require('../model/user');
const ProvinceModel = require('../model/province');
const BaseComponent = require('../prototype/baseComponent');
const dtime = require('time-formater');
const formidable = require('formidable');

class Province extends BaseComponent {
  // 构造函数
  constructor() {
    super();
    this.getAllList = this.getAllList.bind(this);
    this.getPageList = this.getPageList.bind(this);
    this.getProvinceDetail = this.getProvinceDetail.bind(this);
    this.saveProvinceData = this.saveProvinceData.bind(this);
    this.deleteProvinceInfo = this.deleteProvinceInfo.bind(this);
  }

  // 获得所有省份列表数据
  async getAllList(req, res, next) {
    try {
      const provinceList = await ProvinceModel.find({}, '-_id');

      let data = {
        list: provinceList
      };

      res.send(this.successMessage(null, data));
    } catch (err) {
      res.send(this.failMessage(err.message));
    }
  }

  // 获得省份列表
  async getPageList(req, res, next) {
    const { pageSize = 10, pageNumber = 1, provinceName = '', provinceCode = '' } = req.query;

    const offset = (pageNumber - 1) * pageSize;

    // 查询条件
    let queryCondition = {};

    if (provinceName) {
      queryCondition = {
        ...queryCondition,
        provinceName
      }
    }

    if (provinceCode) {
      queryCondition = {
        ...queryCondition,
        provinceCode
      }
    }

    try {
      // 获得省份列表
      const provinceList = await ProvinceModel.find(queryCondition, '-_id')
        .sort({ createTime: 'desc' })
        .skip(Number(offset))
        .limit(Number(pageSize));

      // 获得省份数量
      const provinceCount = await ProvinceModel.find(queryCondition).count();

      let data = {
        list: provinceList,
        count: provinceCount
      };

      res.send(this.successMessage(null, data));
    } catch (err) {
      res.send(this.failMessage(err.message));
    }
  }

  // 获得省份详情
  async getProvinceDetail(req, res, nex) {
    const { provinceId = 0 } = req.query;

    try {
      if (!provinceId) {
        throw new Error('省份id不能为空');
      }

      // 获得省份信息
      let provinceInfo = await ProvinceModel.findOne({ id: provinceId }, '-_id -__v').lean();

      if (!provinceInfo) {
        throw new Error('未找到与id对应的省份信息');
      } else {
        res.send(this.successMessage(null, provinceInfo));
      }
    } catch (err) {
      res.send(this.failMessage(err.message));
    }
  }

  // 保存省份数据
  async saveProvinceData(req, res, next) {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send(this.failMessage('表单信息错误'));
        return;
      }

      const { userId } = req.auth;
      const { provinceName, provinceCode, id = 0 } = fields;
      
      try {
        if (!provinceName) {
          throw new Error('省份名称不能为空');
        } else if (!provinceCode) {
          throw new Error('省份编码不能为空');
        }

        let provinceInfo = {
          provinceName,
          provinceCode
        }

        // 根据省份名称查找省份信息
        const provinceFromName = await ProvinceModel.findOne({ provinceName });

        // 根据省份编码查找省份信息
        const provinceFromCode = await ProvinceModel.findOne({ provinceCode });

        // 获得用户信息
        const { userName } = await UserModel.findOne({ id: userId }, '-_id -password -__v').lean();

        // 生成省份 id，省份 id 是唯一的
        const provinceId = await this.generateIdValue('provinceId');

        // 编辑省份信息
        if (id) {
          await ProvinceModel.updateOne({ id }, { $set: provinceInfo })
          res.send(this.successMessage('省份编辑成功'));
          // 新增省份信息
        } else {
          if (provinceFromName) {
            throw new Error('省份名称已存在');
          }

          if (provinceFromCode) {
            throw new Error('省份编码已存在');
          }

          provinceInfo = {
            ...provinceInfo,
            id: provinceId,
            createBy: userName,
            createTime: dtime().format('YYYY-MM-DD HH:mm:ss')
          }

          await ProvinceModel.create(provinceInfo);
          res.send(this.successMessage('省份新增成功'));
        }

      } catch (err) {
        res.send(this.failMessage(err.message));
      }
    });
  }

  // 删除省份
  async deleteProvinceInfo(req, res, next) {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send(this.failMessage('表单信息错误'));
        return;
      }

      const { provinceId = 0 } = fields;

      try {
        if (!provinceId) {
          throw new Error('省份id不能为空');
        }

        // 根据省份 id 查找省份信息
        const province = await ProvinceModel.findOne({ id: provinceId });
        
        if (!province) {
          throw new Error('没有找到与id对应的省份信息');
        }

        await ProvinceModel.findOneAndDelete({ id: provinceId })
        res.send(this.successMessage('省份删除成功'));

      } catch (err) {
        res.send(this.failMessage(err.message));
        return;
      }
    });
  }
}

module.exports = new Province();
