// frontend/utils/api.js
import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY || 'frontend-api-key',
  },
});

export const fetchFromBackend1 = async (endpoint) => {
  try {
    const response = await api.get(`${process.env.NEXT_PUBLIC_BACKEND1_URL || 'http://backend1.questnest.in'}/api/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching from Backend 1:', error);
    throw error;
  }
};

export const fetchFromBackend2 = async (endpoint) => {
  try {
    const response = await api.get(`${process.env.NEXT_PUBLIC_BACKEND2_URL || 'http://backend2.questnest.in'}/api/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching from Backend 2:', error);
    throw error;
  }
};

export const createTenant = async (userData) => {
  try {
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_BACKEND1_URL || 'http://backend1.questnest.in'}/api/create-tenant/`, 
      userData
    );
    return response.data;
  } catch (error) {
    console.error('Error creating tenant:', error);
    throw error;
  }
};

export default api;