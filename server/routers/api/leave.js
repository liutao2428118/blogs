import { Controller, Get, Post, Put, AuthAll, Required } from '../../decorator/router'
import { addLeave, getLeaveListAdmin, deleteLeave, getIsReadLeave, setLeaveRead } from '../../controllers/leave'

@Controller('/leave')
@AuthAll
class LeaveController {
    // 添加留言
    @Post('/add-leave')
    @Required({
      body: ['content']
    })
  async addLeave (ctx, next) {
    await addLeave(ctx, next)
  }

    @Get('/leave-list')
    async leaveList (ctx, next) {
      await getLeaveListAdmin(ctx, next)
    }

    @Get('/delete-leave')
    async deleteLeave (ctx, next) {
      await deleteLeave(ctx, next)
    }

    @Get('/get-isReadLeave')
    async getIsReadLeave (ctx, next) {
      await getIsReadLeave(ctx, next)
    }

    @Put('/set-leave-read')
    @Required({
      body: ['leaveIds']
    })
    async setLeaveRead (ctx, next) {
      await setLeaveRead(ctx, next)
    }
}

export default LeaveController
