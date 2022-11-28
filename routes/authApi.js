const multer  = require('multer');
const Auth = require('../controller/auth');

const upload = multer({
  dest: './tmp/'
});

const authApi = (router) => {
  // 保存角色数据
  router.post('/auth/upload', upload.single('file'), (req, res, next) => {
    Auth.uploadFile(req, res, next);
  });
};

module.exports = authApi;
