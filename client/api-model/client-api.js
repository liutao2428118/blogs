import axios from 'axios'

import { MessageBox, Message } from 'element-ui'

const ERR_OK = 200

const request = axios.create({
    baseURL: '/api'
})

const handleRequest = (request) => {
    return new Promise((resolve, reject) => {
        request.then(resp => {
            const res = resp.data
            if (res.code === ERR_OK) {
                resolve(res.data)
            } else {
                reject()
                Message({
                    message: res.msg || 'Error',
                    type: 'error',
                    duration: 5 * 1000
                })
            }
        }).catch(err => {
            reject(err)
            console.log('我是err:', err)
        })
    })
}

export default {
    login(user) {
        return handleRequest(request.post('/client/login', user))
    },
    submitReply(data) {
        return handleRequest(request.post('/reply/add-reply', data))
    }
}
