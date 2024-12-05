// src/utils/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Set your base URL here
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function for adding by token or cookies
export const addUser = async (data: { token?: string; cookies?: string }) => {
  try {
    const response = await api.post('/users/add', data);
    return response.data;
  } catch (error) {
    throw new Error('Error adding user');
  }
};

// Function for logging in with email and password
export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post('/users/login', data);
    return response.data;
  } catch (error) {
    throw new Error('Error logging in');
  }
};
