import fetch from 'node-fetch';
import Ids from '../model/ids';

export default class BaseComponent {
  constructor() {
    // id 列表
    this.idList = [
      'userId'
    ];
  }

  async fetch(url = '', data = {}, type = 'GET', resType = 'JSON') {
    type = type.toUpperCase();
    resType = resType.toUpperCase();
    if (type === 'GET') {
      let dataStr = ''; // 数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&';
      });

      if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr;
      }
    }

    let requestConfig = {
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    if (type === 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      });
    }
    let responseJson;
    try {
      const response = await fetch(url, requestConfig);
      if (resType === 'TEXT') {
        responseJson = await response.text();
      } else {
        responseJson = await response.json();
      }
    } catch (err) {
      console.log('获取http数据失败', err);
      throw new Error(err);
    }
    return responseJson;
  }

  /**
   * 根据 id 类型，生成对应的 id 值
   * @param idType id 类型 
   * @return
   */
  async generateIdValue(idType) {
    if (!this.idList.includes(idType)) {
      console.log('id类型错误');
      throw new Error('id类型错误');
    }

    try {
      // 获得 id 对象
      const idData = await Ids.findOne();

      // 给 id 对象中对应的 id 值加一，其目的是为了保证不同数据的 id 值唯一
      idData[idType]++;

      // 更新 id 数据
      await idData.save();
      return idData[idType];
    } catch (err) {
      console.log('获取ID数据失败');
      throw new Error(err);
    }
  }
}
