// 服务端渲染的数据不用经过后端接口路由,直接数据库取
import api from '../../server/api'
import { ap } from 'ramda'

export default {
    getAllClassifys() {
        return new Promise(async (resolve, reject) => {
            const data = await api.client.getAllClassifys()
            resolve(data)
        })
    },
    getAllEssayList(id) {
        return new Promise(async (resolve, reject) => {
            const data = await api.client.getAllEssayList(id)
            resolve(data)
        })
    },
    getTopEssay() {
        return new Promise(async (resolve, reject) => {
            const data = await api.client.getTopEssay()
            resolve(data)
        })
    },
    getEssayFindOne(id) {
        return new Promise(async (resolve, reject) => {
            const data = await api.client.getEssayFindOne(id)
            resolve(data)
        })
    }
}
