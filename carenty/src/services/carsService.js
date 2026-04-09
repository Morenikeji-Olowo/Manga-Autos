import axios from "axios";

const API_BASE_URL = "https://manga-autos.onrender.com";

const carService = {
  // Public — for Cars.jsx browse page (filters, search, pagination)
  getCars: async (filters = {}, sortBy = "newest") => {
    const token = localStorage.getItem("accessToken");
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "All" && value !== "All Brands") {
        params.append(key, value);
      }
    });
    params.append("sort", sortBy);
    const res = await axios.get(
      `${API_BASE_URL}/api/cars?${params.toString()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.data;
  },

  // Admin — for ManageCars.jsx (by status)
  getAdminCars: async (status = "active", page = 1) => {
    const token = localStorage.getItem("accessToken");
    const res = await axios.get(
      `${API_BASE_URL}/api/admin/cars?status=${status}&page=${page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.data;
  },

  // rest of your methods...
  getCarById: async (id) => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${API_BASE_URL}/api/admin/cars/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  addCar: async () => {},

  updateCar: async (id, formData) => {
    const token = localStorage.getItem("accessToken");

    const data = new FormData();

    // Append everything except images and image-tracking fields
    const excluded = ["images", "existingImages", "originalImages"];
    Object.entries(formData).forEach(([key, value]) => {
      if (excluded.includes(key)) return;
      if (Array.isArray(value) || typeof value === "object") {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value);
      }
    });

    // Images to remove
    const removeImages = (formData.originalImages || []).filter(
      (url) => !(formData.existingImages || []).includes(url),
    );
    data.append("removeImages", JSON.stringify(removeImages));

    // New image files
    formData.images?.forEach((file) => data.append("images", file));

    const res = await axios.put(`${API_BASE_URL}/api/admin/cars/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
  deleteCar: async (id) => {
    const token = localStorage.getItem("accessToken");
    const res = await axios.delete(`${API_BASE_URL}/api/admin/cars/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
  markAsSold: async () => {},
};

export default carService;
