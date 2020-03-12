const list = ['Manage', 'AsyncApi', 'UploadFile', 'Business', 'Shop', 'Member', 'Trade'];
const proxy = list.reduce((proxy, key) => ({
  ...proxy,
  [`/${key}/*`]: {
	target: 'http://www.yunhuiyuan.cn',
	changeOrigin: true,
	secure: false,
  }
}), {});

proxy['/g1/*'] = {
  target: 'http://files.1card1.cn'
};

module.exports = config => {
  config.devServer = {
	proxy
  };
};
