import { api } from './api/client'
import { API_ENDPOINTS } from './api/endpoints'
// get all cars
export const getAllCars = async () => {
  return api.get(API_ENDPOINTS.USER_CARS.LIST);
};

// get car by id
export const getCarById = async (id) => {
  return api.get(API_ENDPOINTS.USER_CARS.DETAIL(id));
};

// search cars
export const searchCars = async (query) => {
  return api.post(API_ENDPOINTS.USER_CARS.SEARCH, query);
};

export const updateProfile = async () => {

}
export const updateAvatar = async () => {

}
const userService = {
  getAllCars,
  getCarById,
  searchCars,
  updateAvatar,
  updateProfile
}
export default userService;