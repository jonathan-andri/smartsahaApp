import axios from 'axios';
import { store } from '../store';

export const api = axios.create({
  baseURL: 'https://api.myapp.com/api',
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
