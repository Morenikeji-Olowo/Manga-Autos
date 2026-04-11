import axios from "axios";

const API_BASE_URL = "https://manga-autos.onrender.com";

export const updateProfile = async ({ fullName, phone, address }) => {
  const token = localStorage.getItem("accessToken");
  const res = await axios.put(
    `${API_BASE_URL}/api/user/profile`,
    { fullName, phone, address },
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return res.data;
};

export const updateAvatar = async (file) => {
  const token = localStorage.getItem("accessToken");
  const data = new FormData();
  data.append("avatar", file);
  const res = await axios.put(`${API_BASE_URL}/api/user/profile/avatar`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const addToWishlist = async (carId) => {
  const token = localStorage.getItem("accessToken");

  const res = await axios.post(
    `${API_BASE_URL}/api/user/wishlist`,
    { carId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

const removeFromWishlist = async (carId) => {
  const token = localStorage.getItem('accessToken')
  const res = await axios.delete(`${API_BASE_URL}/api/user/wishlist`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { carId }
  })
  return res.data
}

const getWhishlist = async () => {
  const token = localStorage.getItem("accessToken");

  const res = await axios.get(`${API_BASE_URL}/api/user/wishlist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const userService = {
  updateAvatar,
  updateProfile,
  addToWishlist,
  removeFromWishlist,
  getWhishlist,
};
export default userService;
