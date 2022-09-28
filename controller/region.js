import ProvinceModel from '../model/province';
import CityModel from '../model/city';
import DistrictModel from '../model/district';
import BaseComponent from '../prototype/baseComponent';

class Region extends BaseComponent {
  constructor() {
    super();
    this.getProvinceList = this.getProvinceList.bind(this);
    this.getCityList = this.getCityList.bind(this);
    this.getDistrictList = this.getDistrictList.bind(this);
  }

  // 获得省份数据
  async getProvinceList(req, res, next) {
    try {
      const provinceList = await ProvinceModel.find({}, '-_id -id');

      let data = {
        list: provinceList
      };

      res.send(this.successMessage(null, data));
    } catch (err) {
      res.send(this.failMessage('获取省份列表失败'));
    }
  }

  // 根据省份编码获得省份下面的市数据
  async getCityList(req, res, next) {
    try {
      const { provinceCode } = req.query;
      const cityList = await CityModel.find({ provinceCode: provinceCode }, '-_id -id');

      let data = {
        list: cityList
      };

      res.send(this.successMessage(null, data));
    } catch (err) {
      res.send(this.failMessage('获取市列表失败'));
    }
  }

  // 根据市编码获得市下面的区数据
  async getDistrictList(req, res, next) {
    try {
      const { cityCode } = req.query;
      const districtList = await DistrictModel.find({ cityCode: cityCode }, '-_id -id');

      let data = {
        list: districtList
      };

      res.send(this.successMessage(null, data));
    } catch (err) {
      res.send(this.failMessage('获取区列表失败'));
    }
  }
}

export default new Region();
