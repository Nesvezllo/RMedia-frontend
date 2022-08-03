import axios from 'axios';

const req = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

req.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token')
  return config;
})


export default req;