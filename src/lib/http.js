import axios from 'axios'
export const http = axios.create({
  baseURL: 'https://backend-tham-than.vercel.app/api/',
  // baseURL: 'http://localhost:5000/api/',
  headers: {
    "Content-Type": "application/json",
    // withCredentials: true,
  },
});