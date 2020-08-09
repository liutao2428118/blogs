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
    })
}