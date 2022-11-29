const multer = require('multer');
const Auth = require('../controller/auth');

const upload = multer({
  // 文件上传的临时目录
  dest: './temp/'
});

const authApi = (router) => {
  // 文件上传
  router.post('/auth/upload', upload.single('file'), (req, res, next) => {
    Auth.uploadFile(req, res, next);
  });
};

module.exports = authApi;
