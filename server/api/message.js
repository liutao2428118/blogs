import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId
const Message = mongoose.model('Message')
// const Article = mongoose.model('Article')

export async function setMessage(data) {
    try {
        const message = new Message(data)

        await message.save()

        return message

    } catch (error) {
        throw error
    }
}

