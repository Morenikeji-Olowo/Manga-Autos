export const API_ENDPOINTS = {
  // ===========================
  // Auth (Public & Protected)
  // ===========================
  AUTH: {
    LOGIN: '/api/auth/login',
    SIGNUP: '/api/auth/register',
    ME: '/api/auth/me',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: (token) => `/api/auth/reset-password/${token}`,
    VERIFY_EMAIL: (token) => `/api/auth/verify-email/${token}`,

    // Google OAuth
    GOOGLE_AUTH: '/api/auth/google',
    GOOGLE_CALLBACK: '/api/auth/google/callback',

    // 2FA
    TWO_FA_SETUP: '/api/auth/2fa/setup',
    TWO_FA_VERIFY: '/api/auth/2fa/verify',
    TWO_FA_RESET: '/api/auth/2fa/reset',
  },

  // ===========================
  // Admin Routes
  // ===========================
  ADMIN_CARS: {
    LIST: '/api/admin/cars',
    DETAIL: (id) => `/api/admin/cars/${id}`,
    CREATE: '/api/admin/cars',
    UPDATE: (id) => `/api/admin/cars/${id}`,
    DELETE: (id) => `/api/admin/cars/${id}`,
    MARK_SOLD: (id) => `/api/admin/cars/${id}/sold`,
  },
  ADMIN_MESSAGES: {
    LIST: '/api/admin/messages',
    LISTING_MESSAGES: (listingId) => `/api/admin/messages/listing/${listingId}`,
    UNREAD_COUNT: '/api/admin/messages/unread-count',
    DELETE: (id) => `/api/admin/messages/${id}`,
  },

  // ===========================
  // User Routes
  // ===========================
  USER_CARS: {
    LIST: '/api/user/cars',
    DETAIL: (id) => `/api/user/cars/${id}`,
    SEARCH: '/api/user/car/search',
  },

  // Placeholder for future user-specific endpoints like orders & wishlist
  ORDERS: {
    LIST: '/api/user/orders',
    DETAIL: (id) => `/api/user/orders/${id}`,
    CREATE: '/api/user/orders',
    UPDATE: (id) => `/api/user/orders/${id}`,
    CANCEL: (id) => `/api/user/orders/${id}/cancel`,
  },
  WISHLIST: {
    LIST: '/api/user/wishlist',
    ADD: '/api/user/wishlist',
    REMOVE: (id) => `/api/user/wishlist/${id}`,
    CHECK: (carId) => `/api/user/wishlist/check/${carId}`,
  },

  // User profile
  USER_PROFILE: {
    GET: '/api/user/profile',
    UPDATE: '/api/user/profile',
    CHANGE_PASSWORD: '/api/user/change-password',
    ADDRESSES: '/api/user/addresses',
    ADDRESS: (id) => `/api/user/addresses/${id}`,
  },

  // Contact
  CONTACT: {
    SEND: '/api/contact',
  },
};