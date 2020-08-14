import axios from 'axios'

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
            }
        }).catch(err => {
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
