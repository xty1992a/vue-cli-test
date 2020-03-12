const pages = require('./plugins/pages');
const useProxy = require('./plugins/use-proxy');
const useAlias = require('./plugins/use-alias');
const useResourcesLoader = require("./plugins/use-resources-loader");
const useSvgSpriteLoader = require("./plugins/use-svg-sprite-loader");

module.exports = {
  pages,
  configureWebpack: config => {
	useProxy(config);
	useResourcesLoader(config);
  },
  chainWebpack: config => {
	useSvgSpriteLoader(config);
	useAlias(config);
  }
};
