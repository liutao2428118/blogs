import mongoose from 'mongoose'

const User = mongoose.model('User') // User访客

export async function visitorLogin(body) {
    try {
        let user = await User
            .findOne({ 'username': body.username, 'email': body.email })
            .exec()

        if (!user) {
            user = new User(body)

            user.role = 'visitor'

            await user.save()
        }

        return user
    } catch (error) {
        console.log(error)
    }

}

export async function adminLogin(body) {
    let match = false

    const { username, password } = body
    try {
        let user = await User
            .findOne({ username, role: "user" })
            .exec()

        console.log(user)

        if (user) {
            match = await user.comparePassword(password, user.password)
        }

        return {
            match,
            user
        }
    } catch (error) {
        console.log(error)
    }

}