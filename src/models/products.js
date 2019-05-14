import https from '../services/https'

const Products = {
  state: {
    products: []
  },
  reducers: {
    updateProducts(state, payload) {
      return {
        ...state,
        products: payload
      }
    },
    clearProducts(state) {
      return {
        ...state,
        products: []
      }
    }
  },
  effects: dispatch => ({
    async fetchProducts(payload) {
      try {
        const { data } = await https.get('/products')
        dispatch.Products.updateProducts(data)
        return Promise.resolve(data)
      } catch(error) {
        console.error(error)
        return Promise.reject(error)
      }
    },
    async createProduct(payload) {
      try {
        const { data } = await https.post('/products', payload)
        return Promise.resolve(data)
      } catch(error) {
        console.error(error)
        return Promise.reject(error)
      }
    },
    async editProduct(payload) {
      try {
        const { id, ...rest } = payload
        const { data } = await https.patch(`/products/${id}`, rest)
        return Promise.resolve(data)
      } catch(error) {
        console.error(error)
        return Promise.reject(error)
      }
    },
    async deleteProduct(payload) {
      try {
        const { id } = payload
        const { data } = await https.delete(`/products/${id}`)
        return Promise.resolve(data)
      } catch(error) {
        console.error(error)
        return Promise.reject(error)
      }
    },
  })
}

export default Products
