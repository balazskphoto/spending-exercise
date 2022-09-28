import { api } from "./config/axiosConfig"

export const SpendingsAPI = {
  get: async function (params) {
    const response = await api.request({
      url: `/spendings`,
      method: "GET",
      params
    })

    return response.data
  },
  create: async function (spending) {
    await api.request({
      url: `/spending`,
      method: "POST",
      data: spending,
    })
  },
}