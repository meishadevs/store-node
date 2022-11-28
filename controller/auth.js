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
    const filePath = './' + req.file.path;

    // 获得文件类型、文件大小等信息
    const { mimetype, size, originalname } = req.file;

    // 文件类型
    const temp = originalname.split('.');
    const fileType = temp[temp.length - 1];

    const lastName = '.' + fileType;

    // 构建图片名
    const fileName = Date.now() + lastName;

    // 图片重命名
    fs.rename(filePath, fileName, (err) => {
      if (err) {
        res.send(this.failMessage('文件写入失败'));
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

        cos.sliceUploadFile(params, (err, data) => {
          if (err) {
            // 删除本地文件
            fs.unlinkSync(localFile);
            res.send(this.failMessage('文件上传失败', JSON.stringify(err)));
          } else {
            // 删除本地文件
            fs.unlinkSync(localFile);
            const fileInfo = {
              fileName: data.Key,
              fileUrl: `https://${data.Location}`,
              fileSize: size,
              fileType: mimetype
            };

            res.send(this.successMessage("文件上传成功", fileInfo));
          }
        });
      }
    });
  }
}

module.exports = new Auth();
