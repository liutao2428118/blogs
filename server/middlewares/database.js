import fs from 'fs'
import { resolve } from 'path'
import mongoose from 'mongoose'
import config from '../config'

const models = resolve(__dirname, '../database/schema')

fs.readdirSync(models)
    .filter(file => ~file.search(/^[^.].*js$/))
    .forEach(file => require(resolve(models, file)))

export const database = app => {
    mongoose.set('useCreateIndex', true)

    mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })

    mongoose.connection.on('disconnected', () => {
        mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
    })
    mongoose.connection.on('error', err => {
        console.error(err)
    })

    mongoose.connection.on('open', async () => {
        console.log('Connected to MongoDB ', config.db)

        const User = mongoose.model('User')

        const user = await User.findOne({ username: 'admin' })

        if (!user) {
            console.log('---------','没有admin')
            let user = new User({
                username: 'admin',
                password: '123456'
            })

            await user.save()
        }


    })
}
