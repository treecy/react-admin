/*
 * @Author: Liu Cui
 * @Date:   2016-11-16 12:26:43
 * @Last Modified by:   Liu Cui
 * @Last Modified time: 2016-11-16 17:34:52
 */

'use strict';
// webpack.config.js
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: "source-map",
  entry: [
      './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/bundle.js',
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


  resolve: {
    extensions: ['', '.js', '.jsx']
  },


  module: {
    loaders: [{
      test: /.jsx?$/,
      loaders: [
        'react-hot',
        'babel?presets[]=es2015,presets[]=stage-0,presets[]=react'
      ],
      exclude: /(node_modules|bower_components)/,
      // query: {
      //   presets: [
      //     require.resolve('babel-preset-es2015'),
      //     require.resolve('babel-preset-react'),
      //     require.resolve('babel-preset-stage-0')
      //   ]
      // }
    }, {
      test: /\.scss$/,
      include: path.join(__dirname, 'src'),
      loader: ExtractTextPlugin.extract('style', 'css!sass?sourceMap')
    }]
  },

  plugins: [
    new ExtractTextPlugin('assets/app.css')
  ]
}
