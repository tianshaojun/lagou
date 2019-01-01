const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
require("@babel/polyfill")

module.exports = {
  // 模式
  mode: 'development',

  devtool: 'cheap-eval-source-map',

  // 入口: entry目录相对于启动webpack所在的目录
  // 1、字符串：单个入口
  // 2、数组：多个入口，一个出口
  // 3、对象：多个入口(chunk), 多个出口
  // entry: './src/app.js'
  // entry: ['./src/app.js', './src/name.js']
  entry: {
    app: ['@babel/polyfill', './src/scripts/app.js']
  },

  // 出口
  output: {
    path: path.resolve(__dirname, '../dev'),
    filename: '[name].js'
  },

  // loaders: 用于对模块的源代码进行转换
  // 多个loader加载的时候，注意顺序
  module: {
    rules: [{
        test: /\.(scss|css)$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader', // 基于file-loader
          options: {
            // limit 定义是否做base64编码的边界值
            limit: 8192,
            name: '[name].[ext]',
            outputPath: 'assets/images'
          }
        }]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: 'string-loader'
        }
      }
    ]
  },

  // 插件：plugins,增强webpack的能力
  plugins: [
    // copy html并且导入入口文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),

    //拷贝文件
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../public'),
      to: path.resolve(__dirname, '../dev/public')
    }])
  ],

  // webserver
  devServer: {
    contentBase: path.resolve(__dirname, "../dev"),
    compress: true,
    port: 9000,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}