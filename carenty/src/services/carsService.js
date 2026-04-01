import axios from "axios";

const API_BASE_URL = "https://manga-autos.onrender.com";

const carService = {
  addCar: async (formData) => {
    const token = localStorage.getItem('accessToken')
    const data = new FormData()

    // append all text fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'images') return // handle separately
      if (typeof value === 'object' && !Array.isArray(value)) {
        data.append(key, JSON.stringify(value))
      } else if (Array.isArray(value)) {
        data.append(key, JSON.stringify(value))
      } else {
        data.append(key, value)
      }
    })

    // append images
    formData.images.forEach((image) => {
      data.append('images', image)
    })

    const res = await axios.post(`${API_BASE_URL}/api/admin/cars`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    return res.data
  },
};

export default carService;