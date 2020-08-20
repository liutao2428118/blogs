const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = {
  pluins: [
    new HtmlWebpackPlugin({
      title: 'ssr', // 默认值：Webpack App
      filename: 'index.html', // 生成的html
      template: path.resolve(__dirname, '../template/index.html'), // 自定义模版
      minify: {
        collapseWhitespace: true, // 是否压缩
        removeComments: true, // 是否移除注释
        removeAttributeQuotes: true // 移除属性的引号
      }
    }),
    new VueClientPlugin()
  ],
  resolve: {
    alias: { // 配置别名
      '@': path.resolve(__dirname, 'src/'),
      apiModel: path.join(__dirname, '../client/api-model/client-api.js')
    },
    extensions: ['.js', '.vue', '.json'] // 默认值: [".js",".json"]  模块名字可以省略的后缀名
  }
}
