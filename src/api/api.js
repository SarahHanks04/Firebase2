import axios from "axios";

export const BASE_URL = "http://localhost:5000";

export const api = {
  fetch: async (endpoint, params = {}) => {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, { params });
    return response.data;
  },
  post: async (endpoint, data) => {
    return axios.post(`${BASE_URL}/${endpoint}`, data);
  },
};
