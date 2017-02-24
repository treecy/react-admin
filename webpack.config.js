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
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: "source-map",
    entry: {
        app: './src/App.jsx',
        style: './src/style/style.js'
    },
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


    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            components: path.join(__dirname, 'src/components'),
        },
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
        },
        {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[hash].[ext]"
        },
        {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file?name=assets/fonts/[name].[hash].[ext]"
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file?name=assets/img/[name].[hash].[ext]'
        },
        {
            test: /\.scss$/,
            include: path.join(__dirname, 'src'),
            loader: ExtractTextPlugin.extract('style', 'css!sass?sourceMap')
        }]
    },

    plugins: [
        new ExtractTextPlugin('assets/[name].css'),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
    ]
}
