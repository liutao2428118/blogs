import path from 'path'
import fs from'fs'
import axios from'axios'
import * as VueServerRenderer from 'vue-server-renderer'
import ejs from 'ejs'

// 读取ejs模板
const template = fs.readFileSync(path.join(__dirname, '../../template/server.template.ejs'), 'utf-8')

export const devSsr = function (bundle) {
    return async function (ctx, next) {
        // 发起一个get请求获取客户端vue-ssr-client-manifest
        const clientManifestResp = await axios.get('http://127.0.0.1:8000/vue-ssr-client-manifest.json')
        // 获取到具体内容
        const clientManifest = clientManifestResp.data
        
        // 创建createBundleRenderer, inject:false表示手动注入html模板
        const renderer = VueServerRenderer.createBundleRenderer(bundle, { inject: false, clientManifest })

        
        // 设置返回文件类型是html
        ctx.headers['Content-Type'] = 'text/html'
        // 服务端与客户端沟通的上下文对象context
        const context = { url: ctx.path }

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

export const porSsr = async function (ctx, next) {
    const bundle = require('../../server-build/server-entry').default
    const clientManifest = require('../../public/vue-ssr-client-manifest.json')
    const renderer = VueServerRenderer.createRenderer({ inject: false, clientManifest })


    ctx.headers['Content-Type'] = 'text/html'
    const context = { url: ctx.path }

    try {
        const app = await bundle(context)
        const appString = await renderer.renderToString(app, context)
        const html = ejs.render(template, {
            appString,
            style: context.renderStyles(),
            scripts: context.renderScripts(),
            initalState: context.renderState()
        })
        ctx.body = html
    } catch (err) {
        console.log('render error', err)
        throw err
    }
}