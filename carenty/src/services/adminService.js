import axios from "axios";

const API_BASE_URL = "https://manga-autos.onrender.com";

export const updateProfile = async ({ fullName, phone, address }) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.put(
    `${API_BASE_URL}/api/admin/profile`,
    { fullName, phone, address },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return res.data;
};

export const updateAvatar = async (file) => {
  const token = localStorage.getItem("accessToken");
  const data = new FormData();
  data.append("avatar", file);
  const res = await axios.put(`${API_BASE_URL}/api/admin/profile/avatar`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const updateCar = async (id, formData) => {
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
  }
const deleteCar = async (id) => {
    const token = localStorage.getItem("accessToken");
    const res = await axios.delete(`${API_BASE_URL}/api/admin/cars/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }

const getAdminCars = async (status = "active", page = 1) => {
    const token = localStorage.getItem("accessToken");
    const res = await axios.get(
      `${API_BASE_URL}/api/admin/cars?status=${status}&page=${page}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return res.data;
  }

const getCarById = async (id) => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(`${API_BASE_URL}/api/admin/cars/${id}`,{
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
const adminService = {
  updateAvatar,
  updateProfile,
  updateCar,
  deleteCar,
  getCarById,
  getAdminCars,
};

export default adminService;