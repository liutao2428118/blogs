import { Controller, Get, Post, Put, Auth, AuthAll, Required } from '../../decorator/router'
import { addLeave } from '../../controllers/leave'

@Controller('/leave')
@AuthAll
class LeaveController {

    // 添加留言
    @Post('/add-leave')
    @Required({
        body: ['content']
    })
    async addLeave(ctx, next) {
        await addLeave(ctx, next)
    }

}