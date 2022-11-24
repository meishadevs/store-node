const UserModel = require('../model/user');
const CityModel = require('../model/city');
const DistrictModel = require('../model/district');
const BaseComponent = require('../prototype/baseComponent');
const dtime = require('time-formater');
const formidable = require('formidable');

class City extends BaseComponent {
  // 构造函数
  constructor() {
    super();
    this.getAllList = this.getAllList.bind(this);
    this.getPageList = this.getPageList.bind(this);
    this.getCityDetail = this.getCityDetail.bind(this);
    this.saveCityData = this.saveCityData.bind(this);
    this.deleteCityInfo = this.deleteCityInfo.bind(this);
  }

  // 获得所有市列表数据
  async getAllList(req, res, next) {
    const { provinceCode } = req.query;

    try {
      // 查询条件
      let queryCondition = {};

      if (provinceCode) {
        queryCondition = {
          ...queryCondition,
          provinceCode
        };
      }
      
      const cityList = await CityModel.find(queryCondition, '-_id -__v -id -createBy -createTime');

      let data = {
        list: cityList
      };

      res.send(this.successMessage(null, data));
    } catch (err) {
      res.send(this.failMessage(err.message));
    }
  }

  // 获得市列表
  async getPageList(req, res, next) {
    const { pageSize = 10, pageNumber = 1, cityName = '', cityCode = '', provinceCode = '' } = req.query;

    const offset = (pageNumber - 1) * pageSize;

    // 查询条件
    let queryCondition = {};

    let list = [];

    if (cityName) {
      queryCondition = {
        ...queryCondition,
        cityName: { $regex: cityName }
      }
    }

    if (cityCode) {
      queryCondition = {
        ...queryCondition,
        cityCode: { $regex: cityCode }
      }
    }

    if (provinceCode) {
      queryCondition = {
        ...queryCondition,
        provinceCode
      }
    }

    try {
      // 获得市列表
      const cityList = await CityModel.find(queryCondition, '-_id')
        .sort({ createTime: 'desc' })
        .skip(Number(offset))
        .limit(Number(pageSize))
        .lean()
        .populate({
          path: 'provinceList',
          select: 'provinceName -_id'
        });

      cityList.map(item => {
        const { id, cityCode, cityName, provinceCode, createBy, createTime, provinceList } = item;

        list.push({
          id,
          cityCode,
          cityName,
          provinceCode,
          provinceName: provinceList.length ? provinceList[0].provinceName : '',
          createBy,
          createTime
        });
      });

      // 获得市数量
      const cityCount = await CityModel.find(queryCondition).count();

      let data = {
        list,
        count: cityCount
      };

      res.send(this.successMessage(null, data));
    } catch (err) {
      res.send(this.failMessage(err.message));
    }
  }

  // 获得市详情
  async getCityDetail(req, res, nex) {
    const { cityId = 0 } = req.query;

    try {
      if (!cityId) {
        throw new Error('市id不能为空');
      }

      // 获得市信息
      let cityInfo = await CityModel.findOne({ id: cityId }, '-_id -__v')
        .lean()
        .populate({
          path: 'provinceList',
          select: 'provinceName -_id'
        });

      if (!cityInfo) {
        throw new Error('未找到与id对应的市信息');
      } else {
        let provinceName = '';

        if(cityInfo.provinceList.length) {
          provinceName = cityInfo.provinceList[0].provinceName;
        }
        
        cityInfo = {
          ...cityInfo,
          provinceName
        };

        delete cityInfo.provinceList;

        res.send(this.successMessage(null, cityInfo));
      }
    } catch (err) {
      res.send(this.failMessage(err.message));
    }
  }

  // 保存市数据
  async saveCityData(req, res, next) {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send(this.failMessage('表单信息错误'));
        return;
      }

      const { userId } = req.auth;
      const { provinceCode, cityName, cityCode, id = 0 } = fields;

      try {
        if (!provinceCode) {
          throw new Error('省份编码不能为空');
        } else if (!cityName) {
          throw new Error('市名称不能为空');
        } else if (!cityCode) {
          throw new Error('市编码不能为空');
        }

        let cityInfo = {
          cityName,
          cityCode,
          provinceCode,
        }

        // 根据市名称查找市信息
        const cityFromName = await CityModel.findOne({ cityName });

        // 根据市编码查找市信息
        const cityFromCode = await CityModel.findOne({ cityCode });

        // 获得用户信息
        const { userName } = await UserModel.findOne({ id: userId }, '-_id -password -__v').lean();

        // 生成市 id，市 id 是唯一的
        const cityId = await this.generateIdValue('cityId');

        // 编辑市信息
        if (id) {
          await CityModel.updateOne({ id }, { $set: cityInfo })
          res.send(this.successMessage('市编辑成功'));
          // 新增市信息
        } else {
          if (cityFromName) {
            throw new Error('市名称已存在');
          }

          if (cityFromCode) {
            throw new Error('市编码已存在');
          }

          cityInfo = {
            ...cityInfo,
            id: cityId,
            createBy: userName,
            createTime: dtime().format('YYYY-MM-DD HH:mm:ss')
          }

          await CityModel.create(cityInfo);
          res.send(this.successMessage('市新增成功'));
        }

      } catch (err) {
        res.send(this.failMessage(err.message));
      }
    });
  }

  // 删除市
  async deleteCityInfo(req, res, next) {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send(this.failMessage('表单信息错误'));
        return;
      }

      const { cityId = 0 } = fields;

      try {
        if (!cityId) {
          throw new Error('市id不能为空');
        }

        // 根据市 id 查找市信息
        const city = await CityModel.findOne({ id: cityId });

        if (!city) {
          throw new Error('没有找到与id对应的市信息');
        }

        const district = await DistrictModel.findOne({ cityCode: city.cityCode });

        if (district) {
          throw new Error('该市下存在区数据，不能删除');
        }

        await CityModel.findOneAndDelete({ id: cityId })
        res.send(this.successMessage('市删除成功'));

      } catch (err) {
        res.send(this.failMessage(err.message));
        return;
      }
    });
  }
}

module.exports = new City();
