import { api } from './api/client'
import { API_ENDPOINTS } from './api/endpoints'

export const ordersService = {
  // Get all orders for current user
  getOrders: async (params = {}) => {
    const { page = 1, limit = 10, status } = params
    const queryParams = new URLSearchParams({ page, limit, ...(status && { status }) }).toString()
    
    return api.get(`${API_ENDPOINTS.ORDERS.LIST}?${queryParams}`)
  },

  // Get single order by ID
  getOrderById: async (id) => {
    return api.get(API_ENDPOINTS.ORDERS.DETAIL(id))
  },

  // Create new order (booking)
  createOrder: async (orderData) => {
    return api.post(API_ENDPOINTS.ORDERS.CREATE, orderData)
  },

  // Update order
  updateOrder: async (id, orderData) => {
    return api.put(API_ENDPOINTS.ORDERS.UPDATE(id), orderData)
  },

  // Cancel order
  cancelOrder: async (id, reason) => {
    return api.post(API_ENDPOINTS.ORDERS.CANCEL(id), { reason })
  },
}