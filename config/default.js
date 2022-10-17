module.exports = {
  port: 8002,
  url: 'mongodb://192.168.10.178:27017/store',
  session: {
    name: 'store',
    secret: 'store',
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 365 * 24 * 60 * 60 * 1000
    }
  }
};
