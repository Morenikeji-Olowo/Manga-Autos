import axios from "axios";

const API_BASE_URL = "https://manga-autos.onrender.com";

const carService = {
  getCars: async (filters = {}, sortBy = "newest") => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "All" && value !== "All Brands") {
        params.append(key, value);
      }
    });
    params.append("sort", sortBy);

    const res = await axios.get(`${API_BASE_URL}/api/cars?${params.toString()}`);
    return res.data;
  },

  getCarById: async (id) => {
    const res = await axios.get(`${API_BASE_URL}/api/cars/${id}`);
    return res.data;
  },
};

export default carService;