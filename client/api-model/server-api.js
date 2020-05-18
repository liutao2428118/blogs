import { getCategoryList } from '../../server/controllers/category'

export default {
  getAllCategorys () {
    return new Promise(async (resolve, reject) => {
      const data = await getCategoryList()
      resolve(data)
    })
  }
}
