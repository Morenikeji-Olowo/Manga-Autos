import axios from 'axios'

const API_BASE_URL = 'https://manga-autos.onrender.com'

const authService = {
  signup: async ({ username, email, password }) => {
    const res = await axios.post(`${API_BASE_URL}/api/auth/register`, { username, email, password })
    return res.data
  },

  login: async (email, password) => {
    const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password })
    return res.data
  },

  resendVerificatiion: async(email)=>{
    const res = await axios.post(`${API_BASE_URL}/api/auth/resend-verification`, { email })
    return res.data
  },

  logout: async () => {
    return true // or call API
  },

  getMe: async () => {
    const res = await axios.get(`${API_BASE_URL}/api/auth/me`)
    return res.data
  }
}

export default authService