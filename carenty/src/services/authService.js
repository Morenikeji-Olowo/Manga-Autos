  // src/services/adminService.js
  import axios from 'axios'

  const authService = {
    signup: async ({ username, email, password }) => {
      const res = await axios.post('/api/auth/signup', { username, email, password })
      return res.data
    },

    login: async (email, password) => {
      const res = await axios.post('/api/auth/login', { email, password })
      return res.data
    },

    logout: async () => {
      return true // or call API
    },

    getMe: async () => {
      const res = await axios.get('/api/auth/me')
      return res.data
    }
  }

  export default authService