module.exports = {
  port: 8002,
  url: 'mongodb://localhost:27017/store',
  secretKey: 'store',
  expiresIn: '10h',
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
