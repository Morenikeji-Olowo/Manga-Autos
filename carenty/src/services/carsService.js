import axios from "axios";

const API_BASE_URL = "https://manga-autos.onrender.com";

const carService = {
  // Public — for Cars.jsx browse page (filters, search, pagination)
  getCars: async (filters = {}, sortBy = "newest") => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== "All" && value !== "All Brands") {
      params.append(key, value);
    }
  });
  params.append("sort", sortBy);
  const res = await axios.get(
    `${API_BASE_URL}/api/user/cars?${params.toString()}`
  );
  return res.data;
},

  // rest of your methods...
  getCarById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/api/user/cars/${id}`);
    return response.data;
  },
  addCar: async () => {},


  markAsSold: async () => {},
};

export default carService;
