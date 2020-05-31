import fs from 'fs'
import { resolve } from 'path'
import mongoose from 'mongoose'
import config from '../config'
import R from 'ramda'

const models = resolve(__dirname, '../database/schema')


fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*js$/))
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

        const Category = mongoose.model('Category')
        const Essay = mongoose.model('Essay')

        const existEssay = await Essay.find({}).exec()

        const existCategory = await Category.find({}).exec()

        if (!existCategory.length) {
            let cat = new Category({
                name: 'Vue',
                genre: 1
            })
            await cat.save()
        }

        if (!existEssay.length) {
            let ess = new Essay({
                title: 'vue的真的2018',
                category: '5ed34cbc9f136530d0c676cc',
                outline: 'vue的真的2018',
                content: 'vue的真的2018的主要内容！！！！',
                issued: 1,
                reprint: 1,
                pageview: 200,
                like: 500,
                meta: {
                    createdAt: new Date('2018/02/25 00:00:00').getTime()
                }
            })

            await ess.save()
        }
    })
}