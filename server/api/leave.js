import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId
const LeaveNote = mongoose.model('LeaveNote')

export async function addLeave(content, authorId) {
    try {
        const leave = new LeaveNote()

        leave.content = content
        leave.authorId = authorId

        await leave.save()

        return leave
    } catch (error) {
        throw error
    }
}

export async function getLeaveList() {
    try {
        const leaves = await LeaveNote
            .find()
            .populate({
                path: 'authorId',
                select: 'username'
            })
            .exec()

            return leaves
    } catch (error) {
        
    }
}

