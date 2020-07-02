import { Controller, Get, Post, Auth, AuthAll, Required } from '../decorator/router'
import { getUploadToken } from '../controllers/qiniu'

@Controller('/admin/qiniu')
@AuthAll
class AdminController {

    @Post('/upload-token')
    async getUploadToken(ctx, next) {
         
        const uploadToken = getUploadToken()


        return ctx.success('获取成功', {uploadToken})
    }
}