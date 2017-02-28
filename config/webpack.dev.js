var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var path = require('path');

module.exports = webpackMerge(commonConfig, {
  devtool: "source-map",

  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'assets/[name].js',

    //在不加这条时 webpack sev hotload 会失败
    //改成绝对路径，解决 style-loader 里的blob后无法定位静态资源的问题
    publicPath: 'http://localhost:8080/',
  },

  devServer: {
    inline: true,
    historyApiFallback: {
      rewrites: [
        {from: /^\/view/, to: '/'}
      ]
    }
  },

  module: {
    loaders: [{
      test: /\.scss$/,
      include: path.join(__dirname, '../src'),
      /**
       * Note:
       * about source maps support and assets referenced with url:
       * when style loader is used with ?sourceMap option,
       * the CSS modules will be generated as Blobs,
       * so relative paths don't work
       * (they would be relative to chrome:blob or chrome:devtools).
       * In order for assets to maintain correct paths setting output.publicPath property of webpack configuration must be set,
       * so that absolute paths are generated.
       */
      loaders: ["style-loader", 'css?sourceMap', 'resolve-url-loader', 'sass?sourceMap'],
    }]
  },

});