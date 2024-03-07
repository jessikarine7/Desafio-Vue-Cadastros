import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/produtos`)
  return response.data
};

export const getById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/produtos/${id}`)
  return response.data
};

export const createProduct = async (postData) => {
  const response = await axios.post(`${API_BASE_URL}/produtos`, postData)
  return response.data
};

export const updateProduct = async (id, updatedData) => {
  const response = await axios.put(`${API_BASE_URL}/produtos/${id}`, updatedData)
  return response.data
};