module.exports =  {
  "Manage/WeChat/SetInvoice": {
	entry: 'src/views/Manage/WeChat/SetInvoice/index.js',
	template: process.env.NODE_ENV === 'production' ? 'src/template/index.cshtml' : 'src/views/Manage/WeChat/SetInvoice/index.html',
	filename: process.env.NODE_ENV === 'production' ? 'Manage/WeChat/SetInvoice.cshtml' : 'Manage/WeChat/SetInvoice.html',
	title: '"电子发票"',
	inject: process.env.NODE_ENV === 'development',
	minify: false,
	chunks: ['chunk-vendors', 'chunk-common', 'Manage/WeChat/SetInvoice'],
	menuId: '"0516"'
  },
}
