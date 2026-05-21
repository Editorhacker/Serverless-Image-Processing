import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Upload image
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const response = await api.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all images
export const getImages = async () => {
  try {
    const response = await api.get('/images');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get image details
export const getImageDetails = async (imageId) => {
  try {
    const response = await api.get(`/images/${imageId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Download image
export const downloadImage = async (imageId, version = 'original') => {
  try {
    const response = await api.get(`/images/${imageId}/download/${version}`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;
