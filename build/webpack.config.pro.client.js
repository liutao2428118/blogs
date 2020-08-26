const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.config.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽取样式到单独文件的插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css的插件
const TerserPlugin = require('terser-webpack-plugin') // js压缩插件
const CopyWebpackPlugin = require('copy-webpack-plugin') // 在webpack中拷贝文件和文件夹的插件

const pluginsConfig = require('./client.pluins.config')

module.exports = merge(base, {
  target: 'web',
  mode: 'production',
  entry: path.resolve(__dirname, '../client/client-entry.js'),
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.join(__dirname, '../public'),
    publicPath: '/public/'
  },
  resolve: pluginsConfig.resolve,
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
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
        MiniCssExtractPlugin.loader, // 抽离样式
        {
          loader: 'css-loader',
          options: {
            sourceMap: true // sourceMap找到样式的出处
          }
        },
        {
          loader: 'postcss-loader',
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
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: { // 抽离.vue文件里的css配置
          css: {
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true // sourceMap找到样式的出处
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss', // options中应用require 需要ident申明一下
                  sourceMap: true,
                  plugins: loader => [
                    require('autoprefixer')({ // require进来autoprefixer
                      overrideBrowserslist: ['> 0.15% in CN']
                    }) // autoprefixer添加前缀,browser设置支持哪些浏览器
                  ]
                }
              }
            ]

          },
          stylus: {
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true // sourceMap找到样式的出处
                }
              },
              {
                loader: 'postcss-loader',
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
        }
      }
    }
    ]
  },
  plugins: pluginsConfig.pluins.concat([
    new MiniCssExtractPlugin({
      filename: '[name][hash].css', // 设置最终输出的文件名
      chunkFilename: '[id][hash].css'
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, '../server/static'), // 拷贝不需要打包的文件夹路径
        to: path.resolve(__dirname, '../public')
      }]
    })
  ]),
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true, // 消除注释
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
})
