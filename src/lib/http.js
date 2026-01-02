import axios from 'axios'
export const http = axios.create({
    baseURL: 'https://backend-tham-than.vercel.app/api/',
    headers: {
    "Content-Type": "application/json",
  },
});