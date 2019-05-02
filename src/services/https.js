import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

const setJwt = jwt => {
  if(jwt) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
  }
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt
}
