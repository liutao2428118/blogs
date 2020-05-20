const path = require('path')
const merge = require('webpack-merge')
const base = require('./webpack.config.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽取样式到单独文件的插件
const VueServerPlugin = require('vue-server-renderer/server-plugin')


const isDev = process.env.NODE_ENV === 'development'

let plugins = [
    new MiniCssExtractPlugin({
        filename: '[name][hash].css', // 设置最终输出的文件名
        chunkFilename: '[id][hash].css'
    })
]

if (isDev) {
    plugins.push(new VueServerPlugin())
}

module.exports = merge(base, {
    target: 'node',
    entry: path.join(__dirname, '../client/server-entry.js'),
    devtool: 'source-map',
    output: {
        libraryTarget: 'commonjs2', // 导出已node模块化形式
        filename: 'server-entry.js',
        path: path.join(__dirname, '../server-build')
    },
    externals: Object.keys(require('../package.json').dependencies),
    resolve:{
        alias: { // 配置别名
            'apiModel': path.join(__dirname, '../client/api-model/server-api.js')
        },
        extensions: ['.js', '.vue', '.json'] 
    },
    module: {
        rules: [
            {
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
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ],
                exclude: /node_modules/
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
            }
        ]
    },
    plugins
})