import mongoose from 'mongoose'

const User = mongoose.model('User')


/**
 * 访客登录
 * @param {Object} body 
 */
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

/**
 * 后台登录
 * @param {*} body 
 */
export async function adminLogin(body) {
    let match = false
    let inc = false

    const { username, password } = body
    try {
        let user = await User
            .findOne({ username, role: "user" })
            .exec()

        console.log(user)

        if (user) {
            // inc = await user.incLoginAttepts(user)
            match = await user.comparePassword(password, user.password)
            
        }

        return {
            // inc,
            match,
            user
        }
    } catch (error) {
        console.log(error)
    }

}