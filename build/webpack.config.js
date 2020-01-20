// webpack.config.js

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 该插件将入口js文件引入到html中
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // build前清除dist文件夹的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 该插件拆分css，将css以外链方式引入html中
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
let indexSass = new ExtractTextWebpackPlugin('index.css')
let indexCss = new ExtractTextWebpackPlugin('index.sass')
module.exports = {
  mode: 'development', // 开发模式
  // 入口文件
  entry: {
    main: path.resolve(__dirname, '../src/main.js'),
    header: path.resolve(__dirname, '../src/header.js')
  },
  // 输出
  output: {
    filename: '[name].[hash:8].js', // 打包后的文件名称
    path: path.resolve(__dirname, '../dist') // 打包后的目录
  },
  // 配置打包后的js文件引入到目标入口html中
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      chunks: ['main'] // 与入口文件对应的模块名
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/header.html'),
      filename: 'header.html',
      chunks: ['header'] // 与入口文件对应的模块名
    }),
    new CleanWebpackPlugin(), // 清除上一次dist残余文件
    new MiniCssExtractPlugin({
      fliname: 'name.[hash].css',
      chunkFilename: '[id].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // 从右往左解析原则
      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: {
                plugins: [require('autoprefixer')]
              }
            }
          },
          'sass-loader'
        ] // 从右往左原则
      }
    ]
  }
}