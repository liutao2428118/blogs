import api from '../../server/api'

export default {
    getAllCategorys() {
        return new Promise(async (resolve, reject) => {
            const data = await api.client.getAllCategorys()
            resolve(data)
        })
    },
    getAllEssay(id) {
        return new Promise(async (resolve, reject) => {
            const data = await api.client.getAllEssay(id)
            resolve(data)
        })
    }
}
