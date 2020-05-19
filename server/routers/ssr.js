/**
 * ssr路由
 */
import path  from 'path'
import MemoryFS from 'memory-fs'
import webpack from 'webpack'
import { devSsr, porSsr } from '../controllers/ssr'
import { Controller, Get } from '../decorator/router'

const isDev = process.env.NODE_ENV === 'development'

let bundle

if (isDev) {
    // 获取服务端打包入口文件
    const serverConfig = require('../../build/webpack.config.server')
    // 调用webpack解析配置文件
    const serverCompiler = webpack(serverConfig)
    // 创建一个内存中读取文件的对象
    const mfs = new MemoryFS()
    // 内存中读取文件的对象赋值给serverCompiler的输出对象
    serverCompiler.outputFileSystem = mfs

    // 监听打包入口文件,发生改变就重新打包
    serverCompiler.watch({}, (err, stats) => {
        if (err) throw err
        stats = stats.toJson()

        // 获取vue-ssr-server-bundle的绝对路径
        const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')

        // 内存中读取vue-ssr-server-bundle文件内容
        bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))

    })
}




@Controller('')
class SsrController {
   
    @Get('*')
    async all(ctx, next) {
        if (isDev) {
            if (!bundle) {
                ctx.body = '你等一会，别着急......'
            }
            const renderer = devSsr(bundle)
            await renderer(ctx, next)
        } else {
            await porSsr(ctx, next)
        }

    }
}
