import request from '../services/request'

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
        const { data } = await request.get('/products')
        dispatch.Products.updateProducts(data)
        return Promise.resolve(data)
      } catch(error) {
        console.error(error)
        return Promise.reject(error)
      }
    },
    async createProduct(payload) {
      try {
        const { data } = await request.post('/products', payload)
        return Promise.resolve(data)
      } catch(error) {
        console.error(error)
        return Promise.reject(error)
      }
    },
    async editProduct(payload) {
      try {
        const { id, ...rest } = payload
        const { data } = await request.patch(`/products/${id}`, rest)
        return Promise.resolve(data)
      } catch(error) {
        console.error(error)
        return Promise.reject(error)
      }
    },
    async deleteProduct(payload) {
      try {
        const { id } = payload
        const { data } = await request.delete(`/products/${id}`)
        return Promise.resolve(data)
      } catch(error) {
        console.error(error)
        return Promise.reject(error)
      }
    },
  })
}

export default Products
