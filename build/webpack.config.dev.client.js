const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.config.base')
const pluginsConfig = require('./client.pluins.config')

module.exports = merge(base, {
  target: 'web',
  mode: 'development',
  // 入口
  entry: path.resolve(__dirname, '../client/client-entry.js'),
  // 出口
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../public'),
    publicPath: 'http://127.0.0.1:8000/'
  },
  resolve: pluginsConfig.resolve,
  devtool: 'inline-source-map',
  devServer: {
    port: 8000, // 端口
    host: '0.0.0.0', // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问 0.0.0.0
    overlay: { // 出现错误或者警告的时候，是否覆盖页面线上错误消息。
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: {
      index: '/public/index.html'
    },
    proxy: { // 设置代理
      // '/': 'http://127.0.0.1:3000'
      // '/user': 'http://127.0.0.1:3333'
    },
    hot: true // 启用 webpack 的模块热替换特性, 这个需要配合： webpack.HotModuleReplacementPlugin插件
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
          options: {
            // singleton: false
          }
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }
        ]
      },
      {
        test: /\.styl/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true // sourceMap找到样式的出处
            }
          },
          {
            loader: 'postcss-loader', // npm安装postcss-loader的同时要安装autoprefixer
            options: {
              ident: 'postcss', // options中应用require 需要ident申明一下
              sourceMap: true,
              plugins: loader => [
                require('autoprefixer')({ // require进来autoprefixer
                  overrideBrowserslist: ['> 0.15% in CN']
                }) // autoprefixer添加前缀,browser设置支持哪些浏览器
              ]
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: pluginsConfig.pluins
})
