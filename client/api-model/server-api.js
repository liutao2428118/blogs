import api from '../../server/api'

// console.log(api.client.getAllCategorys())

export default {
    getAllCategorys() {
        return new Promise(async (resolve, reject) => {
            const data = await api.client.getAllCategorys()
            resolve(data)
        })
    }
}
