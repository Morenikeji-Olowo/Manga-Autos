import axios from "axios";

const API_BASE_URL = "https://manga-autos.onrender.com";

const carService = {
  // Public — for Cars.jsx browse page (filters, search, pagination)
  getCars: async (filters = {}, sortBy = 'newest') => {
    const token = localStorage.getItem('accessToken')
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'All' && value !== 'All Brands') {
        params.append(key, value)
      }
    })
    params.append('sort', sortBy)
    const res = await axios.get(`${API_BASE_URL}/api/cars?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
  },

  // Admin — for ManageCars.jsx (by status)
  getAdminCars: async (status = 'active', page = 1) => {
    const token = localStorage.getItem('accessToken')
    const res = await axios.get(`${API_BASE_URL}/api/admin/cars?status=${status}&page=${page}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
  },

  // rest of your methods...
  getCarById: async (id) => {
  const response = await axios.get(`${API_BASE_URL}/api/admin/cars/${id}`);
  console.log(response);
  return response.data;
},
  addCar: async () => {  },
  updateCar: async () => {  },
  deleteCar: async () => {  },
  markAsSold: async () => {  },
}

export default carService;