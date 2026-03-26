import { api } from './api/client'
import { API_ENDPOINTS } from './api/endpoints'

export const carsService = {
  // Get all cars with filters
  getCars: async (params = {}) => {
    const { page = 1, limit = 12, ...filters } = params
    
    // Build query string
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...filters
    }).toString()
    
    return api.get(`${API_ENDPOINTS.CARS.LIST}?${queryParams}`)
  },

  // Get single car by ID
  getCarById: async (id) => {
    return api.get(API_ENDPOINTS.CARS.DETAIL(id))
  },

  // Get featured cars for homepage
  getFeaturedCars: async (limit = 6) => {
    return api.get(`${API_ENDPOINTS.CARS.FEATURED}?limit=${limit}`)
  },

  // Search cars by keyword
  searchCars: async (query, params = {}) => {
    const queryParams = new URLSearchParams({
      q: query,
      ...params
    }).toString()
    
    return api.get(`${API_ENDPOINTS.CARS.SEARCH}?${queryParams}`)
  },

  // Get all filter options
  getFilterOptions: async () => {
    return api.get(API_ENDPOINTS.CARS.FILTERS)
  },

  // Compare multiple cars
  compareCars: async (carIds) => {
    return api.post(API_ENDPOINTS.CARS.COMPARE, { carIds })
  },

  // Get similar cars
  getSimilarCars: async (carId, limit = 4) => {
    return api.get(`${API_ENDPOINTS.CARS.SIMILAR(carId)}?limit=${limit}`)
  },
}