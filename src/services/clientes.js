import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// const handleErrors = (error) => {
//   console.error('Erro na requisição:', error)
//   throw error
// };

export const getClientes= async () => {
  const response = await axios.get(`${API_BASE_URL}/clientes`)
  return response.data
};

export const getById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/clientes/${id}`)
  return response.data
};

export const createClientes = async (postData) => {  
  const response = await axios.post(`${API_BASE_URL}/clientes`, postData)
  return response.data
};

export const updateClientes = async (id, updatedData) => {
  const response = await axios.put(`${API_BASE_URL}/clientes/${id}`, updatedData)
  return response.data
};

export const deleteClientes = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/clientes/${id}`)
  return response.data
};