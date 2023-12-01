import axios from "axios"
const baseUrl = "https://node-type-music.onrender.com/api"
export const makeRequest = axios.create({
    baseURL:baseUrl
})

export const privateAxios = axios.create({
    baseURL: baseUrl,
    headers: { 'Content-Type': 'application/json' },
  });