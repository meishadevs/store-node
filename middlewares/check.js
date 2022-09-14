import UserModel from '../model/user';

class Check {
  async checkUser(req, res, next) {
    const user_id = req.session.user_id;
    if (!user_id || !Number(user_id)) {
      res.send({
        status: 0,
        type: 'ERROR_SESSION',
        message: '亲，您还没有登录'
      });
      return;
    } else {
      const user = await UserModel.findOne({ id: user_id });
      if (!user) {
        res.send({
          status: 0,
          type: 'HAS_NO_ACCESS',
          message: '亲，您还不是管理员'
        });
        return;
      }
    }
    next();
  }
  async checkSuperUser(req, res, next) {
    const user_id = req.session.user_id;
    if (!user_id || !Number(user_id)) {
      res.send({
        status: 0,
        type: 'ERROR_SESSION',
        message: '亲，您还没有登录'
      });
      return;
    } else {
      const user = await UserModel.findOne({ id: user_id });
      if (!user || user.status !== 2) {
        res.send({
          status: 0,
          type: 'HAS_NO_ACCESS',
          message: '亲，您的权限不足'
        });
        return;
      }
    }
    next();
  }
}

export default new Check();
