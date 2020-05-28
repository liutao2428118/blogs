import axios from 'axios'

const ERR_OK = 200

const request = axios.create({
    // baseURL: '/'
})

const handleRequest = (request) => {
    return new Promise((resolve, reject) => {
        request.then(resp => {
            const res = resp.data
            if (res.errorCode === ERR_OK) {
                resolve(res.data)
            }
        }).catch(err => {
            console.log('我是err:', err)
        })
    })
}

export default {
    visitorLogin(user) {
        return handleRequest(request.post('/client/login', user))
    },
    submitComments(data) {
        return handleRequest(request.post('/client/comments', data))
    }
}
