import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const handleErrors = (error) => {
  console.error('Erro na requisição:', error)
  throw error
};

export const getClientes= async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/clientes`)
    return response.data
  } catch (error) {
    handleErrors(error)
  }
};

export const getById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/clientes/${id}`)
    return response.data
  } catch (error) {
    handleErrors(error)
  }
};

export const createClientes = async (postData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/clientes`, postData)
    return response.data
  } catch (error) {
    handleErrors(error)
  }
};

export const updateClientes = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/clientes/${id}`, updatedData)
    return response.data
  } catch (error) {
    handleErrors(error)
  }
};

export const deleteClientes = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/clientes/${id}`)
    return response.data
  } catch (error) {
    handleErrors(error)
  }
};