import mongoose from 'mongoose'

const Uesr = mongoose.model('Uesr') // Uesr访客

export async function visitorLogin(body) {
    try {
        let user = await Uesr
            .findOne({'username': body.username, 'email': body.email})
            .exec()

        if(!user) {
            user = new Uesr(body)

            user.role = 'visitor'

            await user.save()
        }
         
        return user
    } catch (error) {
        console.log(error)
    }
    
}