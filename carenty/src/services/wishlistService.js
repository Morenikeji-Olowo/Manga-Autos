import { api } from './api/client'
import { API_ENDPOINTS } from './api/endpoints'

export const wishlistService = {
  // Get user's wishlist
  getWishlist: async () => {
    return api.get(API_ENDPOINTS.WISHLIST.LIST)
  },

  // Add car to wishlist
  addToWishlist: async (carId) => {
    return api.post(API_ENDPOINTS.WISHLIST.ADD, { carId })
  },

  // Remove car from wishlist
  removeFromWishlist: async (id) => {
    return api.delete(API_ENDPOINTS.WISHLIST.REMOVE(id))
  },

  // Check if car is in wishlist
  checkWishlist: async (carId) => {
    return api.get(API_ENDPOINTS.WISHLIST.CHECK(carId))
  },
}