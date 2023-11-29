import axios from "axios"

export const makeRequest = axios.create({
    baseURL:"http://localhost:3007/api"
})

export const privateAxios = axios.create({
    baseURL: "http://localhost:3007/api",
    headers: { 'Content-Type': 'application/json' },
  });