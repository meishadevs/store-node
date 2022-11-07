// 不需要 token 就能访问的 api 接口
module.exports = [
  {
    url: /^\/images\/.*/
  },
  '/user/login',
  '/user/register',
  '/advisory/list',
  '/advisory/count',
  '/product/lis',
  '/product/count',
  '/region/provinceList',
  '/region/cityList',
  '/region/districtList'
];
