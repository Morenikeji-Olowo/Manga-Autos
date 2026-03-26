import { api } from './api/client'
import { API_ENDPOINTS } from './api/endpoints'


// get all admin cars
export const getAdminCars = async () => {
  return api.get(API_ENDPOINTS.ADMIN_CARS.LIST);
};

// create a car (with images)
export const createCar = async (formData) => {
  return api.upload(API_ENDPOINTS.ADMIN_CARS.CREATE, formData);
};

// update car
export const updateCar = async (id, formData) => {
  return api.upload(API_ENDPOINTS.ADMIN_CARS.UPDATE(id), formData);
};

// delete car
export const deleteCar = async (id) => {
  return api.delete(API_ENDPOINTS.ADMIN_CARS.DELETE(id));
};

// mark as sold
export const markCarSold = async (id) => {
  return api.patch(API_ENDPOINTS.ADMIN_CARS.MARK_SOLD(id));
};