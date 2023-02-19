import axios from 'axios';

export const comandaApi = axios.create({
  baseURL: process.env.API_URL,
});
