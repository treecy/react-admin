var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var path = require('path');

module.exports = webpackMerge(commonConfig, {
  devtool: "source-map",

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/[name].js',
    publicPath: '/', //在不加这条时 webpack sev hotload 会失败
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
      loaders: ["style-loader", 'css?sourceMap', 'sass?sourceMap'],
    }]
  },

});