import toast from 'react-hot-toast'

const API_BASE_URL = 'https://manga-autos.onrender.com';

async function handleResponse(response){
  const data = await response.json()
  if (!response.ok) {
    switch (response.status) {
      case 401:
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
        if (window.location.pathname !== '/auth/login') {
          window.location.href = '/auth/login'
          toast.error('Session expired. Please login again.')
        }
        break
      case 403:
        toast.error(data?.message || 'You do not have permission')
        break
      case 404:
        toast.error(data?.message || 'Resource not found')
        break
      case 422:
        if (data?.errors) {
          Object.values(data.errors).forEach(err => toast.error(err[0]))
        } else {
          toast.error(data?.message || 'Validation error')
        }
        break
      case 429:
        toast.error('Too many requests. Please try again later')
        break
      case 500:
        toast.error('Server error. Please try again later')
        break
      default:
        toast.error(data?.message || 'Something went wrong')
    }
    throw new Error(data?.message || 'API Error')
  }
  
  return data
}

export const api = {
  get: async (url, options = {}) => {
    const token = localStorage.getItem('accessToken')
    
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    })
    
    return handleResponse(response)
  },

  post: async (url, data = {}, options = {}) => {
    const token = localStorage.getItem('accessToken')
    
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    })
    
    return handleResponse(response)
  },

  put: async (url, data = {}, options = {}) => {
    const token = localStorage.getItem('accessToken')
    
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    })
    
    return handleResponse(response)
  },

  patch: async (url, data = {}, options = {}) => {
    const token = localStorage.getItem('accessToken')
    
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      body: JSON.stringify(data),
      ...options,
    })
    
    return handleResponse(response)
  },

  delete: async (url, options = {}) => {
    const token = localStorage.getItem('accessToken')
    
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    })
    
    return handleResponse(response)
  },

  // upload: async (url, formData, onProgress = null) => {
  //   const token = localStorage.getItem('accessToken')
    
  //   // If you need upload progress, you'd need XMLHttpRequest
  //   // For now, simple fetch
  //   const response = await fetch(`${API_BASE_URL}${url}`, {
  //     method: 'POST',
  //     headers: {
  //       ...(token && { 'Authorization': `Bearer ${token}` }),
  //     },
  //     body: formData,
  //   })
    
  //   return handleResponse(response)
  // },
}