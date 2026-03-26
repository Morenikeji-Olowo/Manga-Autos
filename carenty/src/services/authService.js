import { api } from "./api/client";
import { API_ENDPOINTS } from "./api/endpoints";

// login
export const loginUser = async (email, password) => {
  return api.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
};

// register
export const registerUser = async (userData) => {
  return api.post(API_ENDPOINTS.AUTH.SIGNUP, userData);
};

// get current user
export const getMe = async () => {
  return api.get(API_ENDPOINTS.AUTH.ME);
};

// logout
export const logoutUser = async () => {
  return api.post(API_ENDPOINTS.AUTH.LOGOUT);
};

// forgot password
export const forgotPassword = async (email) => {
  return api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
};

// reset password
export const resetPassword = async (token, newPassword) => {
  return api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD(token), { password: newPassword });
};