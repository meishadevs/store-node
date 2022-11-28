const fs = require('fs');
const COS = require('cos-nodejs-sdk-v5');
const { tencentCos } = require('config-lite')(__dirname);
const BaseComponent = require('../prototype/baseComponent');

var cos = new COS({
  SecretId: tencentCos.secretId,
  SecretKey: tencentCos.secretKey
});

class Auth extends BaseComponent {
  // 构造函数
  constructor() {
    super();
    this.uploadFile = this.uploadFile.bind(this);
  }

  // 上传文件
  async uploadFile(req, res, next) {
    // 文件路径
    var filePath = './' + req.file.path;

    // 文件类型
    var temp = req.file.originalname.split('.');

    var fileType = temp[temp.length - 1];
    var lastName = '.' + fileType;

    // 构建图片名
    var fileName = Date.now() + lastName;

    // 图片重命名
    fs.rename(filePath, fileName, (err) => {
      if (err) {
        res.end(JSON.stringify({ status: '102', msg: '文件写入失败' }));
      } else {
        var localFile = './' + fileName;

        const params = {
          // 存储桶名称
          Bucket: tencentCos.bucket,

          // 存储桶所在地域
          Region: tencentCos.region,

          // 存储在桶里的对象键
          Key: fileName,

          // 文件路径
          FilePath: localFile
        }

        cos.sliceUploadFile(params, function (err, data) {
          if (err) {
            fs.unlinkSync(localFile);
            res.end(JSON.stringify({ status: '101', msg: '上传失败', error: JSON.stringify(err) }));
          } else {
            fs.unlinkSync(localFile);
            var imageSrc = 'http://devimage-1***********4.cossh.myqcloud.com/' + data.Key;
            res.end(JSON.stringify({ status: '100', msg: '上传成功', imageUrl: imageSrc }));
          }
        });
      }
    });
  }
}

module.exports = new Auth();
