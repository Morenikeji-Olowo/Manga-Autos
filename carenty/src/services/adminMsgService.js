import { api } from './api/client'
import { API_ENDPOINTS } from './api/endpoints'


export const getAdminMessages = async () => {
  return api.get(API_ENDPOINTS.ADMIN_MESSAGES.LIST);
};

export const getListingMessages = async (listingId) => {
  return api.get(API_ENDPOINTS.ADMIN_MESSAGES.LISTING_MESSAGES(listingId));
};

export const getUnreadCount = async () => {
  return api.get(API_ENDPOINTS.ADMIN_MESSAGES.UNREAD_COUNT);
};

export const deleteMessage = async (id) => {
  return api.delete(API_ENDPOINTS.ADMIN_MESSAGES.DELETE(id));
};