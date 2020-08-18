import api from '../api'
import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId

export async function addLeave(ctx, next) {
    const content = ctx.request.body.content

    const user = ctx.session.user

    
    try {
        const leave = await api.leave.addLeave(content, user._id)

        return ctx.success('添加成功！', leave)
    } catch (error) {
        
    }
}

export async function getLeaveList() {

    try {
        const leaves =  await api.leave.getLeaveList()

        return leaves
    } catch (error) {
        
    }

}