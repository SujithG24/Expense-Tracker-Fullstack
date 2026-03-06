import API from './api';

export const login = async (credentials) => {
  // Use the credentials (email and password) to authenticate
  const response = await API.post('/auth/login', credentials);
  
  // Verify the backend actually sent a token
  if (response.data && response.data.token) {
    localStorage.setItem('token', response.data.token);
    console.log("Login successful. Token saved to storage.");
  } else {
    console.error("Login response did not contain a token!", response.data);
  }
  
  return response.data;
};

export const register = async (userData) => {
  // userData must include 'name', 'email', and 'password'
  return await API.post('/auth/register', userData);
};

export const logout = () => {
  localStorage.removeItem('token');
  console.log("User logged out. Token removed.");
  window.location.href = '/login'; // Redirect to login page
};