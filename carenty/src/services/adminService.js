import axios from "axios";

const API_BASE_URL = "https://manga-autos.onrender.com";

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Update the current admin user's profile information
 * @param {{ fullName: string, phone: string, address: string }} data
 * @returns {Promise<Object>} response data
 */
/*******  f72c5e41-95a0-4ad4-9ed0-4678cf79f7b0  *******/
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


const adminService = {
  updateAvatar,
  updateProfile,
};

export default adminService;