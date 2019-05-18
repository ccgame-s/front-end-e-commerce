import request from '../services/request'

const User = {
  state: {
    userInfo: null
  },
  reducers: {
    setUserInfo(state, payload) {
      return {
        ...state,
        userInfo: payload
      }
    },
    removeUserInfo(state) {
      return {
        ...state,
        userInfo: null
      }
    }
  },
  effects: dispatch => ({
    async login(payload) {
      try {
        const { data } = await request.post('/login', payload)
        localStorage.setItem('jwtToken', data.jwtToken)
        dispatch.User.setUserInfo(data)
        request.setJwt(data.jwtToken)
        return Promise.resolve(data)
      } catch(error) {
        console.error(error)
        return Promise.reject(error)
      }
    },
    async logout() {
      try {
        localStorage.removeItem('jwtToken')
        dispatch.User.removeUserInfo()
        request.removeJwt()
        return Promise.resolve()
      } catch(error) {
        console.error(error)
        return Promise.reject(error)
      }
    }
  })
}

export default User
