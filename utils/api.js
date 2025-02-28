// Updated api.js
import axios from 'axios';

// For debugging - remove in production
const logApiCall = (method, url, headers, data = null) => {
  console.log(`${method} request to: ${url}`);
  console.log('Headers:', headers);
  if (data) console.log('Data:', data);
};

// Backend 1 specific API calls
//export const fetchFromBackend1 = async (endpoint) => {
//  const url = `${process.env.NEXT_PUBLIC_BACKEND1_URL || 'https://backend1.questnest.in'}/api/${endpoint}`;
//  const headers = {
///    'Content-Type': 'application/json',
//    'X-API-KEY': process.env.NEXT_PUBLIC_BACKEND1_API_KEY || 'questnest-backend1-api-7b9c4e8d2f1a5360',
//  };
  
//  logApiCall('GET', url, headers);
  
//  try {
//    const response = await axios.get(url, { headers });
//    return response.data;
//  } catch (error) {
//    console.error('Error fetching from Backend 1:', error);
//    // Enhanced error logging
//    if (error.response) {
//      console.error('Response data:', error.response.data);
//      console.error('Response status:', error.response.status);
//    } else if (error.request) {
//      console.error('No response received:', error.request);
//    }
//    throw error;
//  }
//};

export const fetchFromBackend1 = async (endpoint) => {
  try {
    const response = await axios.get(
      `http://143.198.72.142:8000/api/${endpoint}`,
      {
        headers: {
          'X-API-KEY': 'questnest-backend1-api-7b9c4e8d2f1a5360',
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching from Backend 1:', error);
    throw error;
  }
};

// Backend 2 specific API calls
export const fetchFromBackend2 = async (endpoint) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND2_URL || 'https://backend2.questnest.in'}/api/${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.NEXT_PUBLIC_BACKEND2_API_KEY || 'questnest-backend2-api-8f12e9d7b43c6a95',
  };
  
  logApiCall('GET', url, headers);
  
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching from Backend 2:', error);
    // Enhanced error logging
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    }
    throw error;
  }
};

// For creating tenants (uses Backend 1)
export const createTenant = async (userData) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND1_URL || 'https://backend1.questnest.in'}/api/create-tenant/`;
  const headers = {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.NEXT_PUBLIC_BACKEND1_API_KEY || 'questnest-backend1-api-7b9c4e8d2f1a5360',
  };
  
  logApiCall('POST', url, headers, userData);
  
  try {
    const response = await axios.post(url, userData, { headers });
    return response.data;
  } catch (error) {
    console.error('Error creating tenant:', error);
    // Enhanced error logging
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    }
    throw error;
  }
};

export default { fetchFromBackend1, fetchFromBackend2, createTenant };