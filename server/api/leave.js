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

export async function getLeaveList(skip, page_size) {
    try {
        const total = await LeaveNote
            .count()

        const leaves = await LeaveNote
            .find()
            .populate({
                path: 'authorId',
                select: 'username'
            })
            .skip(skip)
            .limit(page_size)
            .sort({ '_id': -1 })
            .exec()

            return {
                list: leaves,
                total
            }
    } catch (error) {
        
    }
}

export async function deleteLeave(id) {
    try {
        const doc = await LeaveNote
            .remove({ _id: ObjectId(id) })
            .exec()

        return doc

    } catch (error) {
        throw error
    }
}

