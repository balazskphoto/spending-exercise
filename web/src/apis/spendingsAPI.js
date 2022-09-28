import api from './config/axiosConfig';

export default {
  async get(params) {
    const response = await api.request({
      url: '/spendings',
      method: 'GET',
      params,
    });

    return response.data;
  },
  async create(spending) {
    const response = await api.request({
      url: '/spending',
      method: 'POST',
      data: spending,
    });

    return response.data;
  },
};
