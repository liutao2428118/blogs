import mongoose from 'mongoose'

const Visitor = mongoose.model('Visitor') // 访客

export async function visitorLogin(body) {
    try {
        let user = await Visitor
            .findOne({'username': body.username, 'email': body.email})
            .exec()

        if(!user) {
            user = new Visitor(body)

            await user.save()
        }
         
        return user
    } catch (error) {
        
    }
    
}