import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:5001",
})

const errorHandler = (error) => {
  const statusCode = error.response?.status

  if (statusCode && statusCode > 299) {
    console.error(error)
  }

  return Promise.reject(error)
}

api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error)
})