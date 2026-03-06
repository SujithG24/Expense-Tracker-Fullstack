import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api', // Your Mac's Backend URL
});

// The Interceptor adds the JWT to every outgoing request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    // DEBUG: This prints to your Chrome console so you can verify the token exists
    if (token) {
      console.log("Token found in storage, attaching to request...");
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No token found in localStorage. Request might fail with 403.");
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;