// src/utils/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const addUser = async (data: { token?: string; cookies?: string }) => {
  try {
    const response = await api.post('/users/add', data);
    return response.data;
  } catch (error) {
    throw new Error('Error adding user');
  }
};

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post('/users/login', data);
    return response.data;
  } catch (error) {
    throw new Error('Error logging in');
  }
};

export const addCommentTemplate = async (data: {content: string; attachment_url?: string}) => {
  try {
    const response = await api.post('/template/add', data);
    return response.data;
  } catch (error) {
    throw new Error('Error adding template comment');
  }
}

