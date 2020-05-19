import axios from 'axios'

const ERR_OK = 0

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
  getAllCategorys () {
    return handleRequest(request.get('/client/all'))
  }
}
