// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/taskmanager-api', // Adjust to match your backend
});

// Add token to headers if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
