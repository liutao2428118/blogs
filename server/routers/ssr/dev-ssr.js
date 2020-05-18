/**
 * vuessr 开发环境
 */
const path = require('path')
const fs = require('fs')
const axios = require('axios')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const ejs = require('ejs')

import { Controller, Get } from '../../decorator/router'

console.log("1111111111111111111111111111")

// 获取服务端打包入口文件
const serverConfig = require('../../../build/webpack.config.server')

// 调用webpack解析入口文件
const serverCompiler = webpack(serverConfig)
// 创建一个内存中读取文件的对象
const mfs = new MemoryFS()
// 内存中读取文件的对象赋值给serverCompiler的输出对象
serverCompiler.outputFileSystem = mfs
let bundle
// 监听打包入口文件,发生改变就重新打包
serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    // webpack默认写法,如需了解更多可以查看webpack文档
    stats = stats.toJson()
    // stats.errors.forEach(err => console.log(err))
    // stats.warnings.forEach(warn => console.warn(err))
    // 获取vue-ssr-server-bundle的绝对路径
    const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
    console.log(bundlePath)
    // 内存中读取vue-ssr-server-bundle文件内容
    bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
    console.log(bundle)
})



@Controller('')
class Devssr {
    constructor() {}

    @Get('*')
    async all(ctx, next) {
        console.log("--------------------------------------------------------你好")
        if (!bundle) {
            ctx.body = '你等一会，别着急......'
        }

        // 发起一个get请求获取客户端vue-ssr-client-manifest
        const clientManifestResp = await axios.get('http://127.0.0.1:8000/vue-ssr-client-manifest.json')
        // 获取到具体内容
        const clientManifest = clientManifestResp.data
        // 读取ejs模板
        const template = fs.readFileSync(path.join(__dirname, '../../server.template.ejs'), 'utf-8')
        // 创建createBundleRenderer, inject:false表示手动注入html模板
        const renderer = VueServerRenderer.createBundleRenderer(bundle, { inject: false, clientManifest })
        // 设置返回文件类型是html
        ctx.headers['Content-Type'] = 'text/html'
        // 服务端与客户端沟通的上下文对象context
        const context = { url: ctx.path, user: ctx.session.user }

        try {
            // 调用renderToString生成DOM元素字符串
            const appString = await renderer.renderToString(context)

            console.log(context.router.currentRoute.fullPath, '----------------', ctx.path)

            if (context.router.currentRoute.fullPath !== ctx.path) {
                return ctx.redirect(context.router.currentRoute.fullPath)
            }
            // 调用ejs.render传参生成完整的html
            const html = ejs.render(template, {
                appString,
                style: context.renderStyles(),
                scripts: context.renderScripts(),
                initalState: context.renderState()
            })
            // 返回给客户端完整的html
            ctx.body = html
            // 抛出错误
        } catch (err) {
            console.log('render error', err)
            throw err
        }
    }
}
