const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg|ico)$/,
                use: [{
                    loader: 'url-loader', // 根据图片大小，把图片优化成base64
                    options: {
                        limit: 10000 // 图片小于10k就转成base64
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/, // 处理字体图标
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}