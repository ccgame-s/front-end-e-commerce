import https from '../services/https'

const User = {
  state: {
    jwtToken: null
  },
  reducers: {
    setJwtToken(state, payload) {
      return {
        ...state,
        jwtToken: payload
      }
    },
    removeJwtToken(state) {
      return {
        ...state,
        jwtToken: null
      }
    }
  },
  effects: dispatch => ({
    async login(payload) {
      try {
        const { data } = await https.post('/login', payload)
        localStorage.setItem('jwtToken', data)
        dispatch.User.setJwtToken(data)
        https.setJwt(data)
        return data
      } catch(error) {
        console.error(error)
        return null
      }
    },
    async logout() {
      try {
        localStorage.removeItem('jwtToken')
        dispatch.User.removeJwtToken()
        https.removeJwt()
      } catch(error) {
        console.error(error)
        return null
      }
    }
  })
}

export default User
