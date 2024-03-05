import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

const handleErrors = (error) => {
  console.error('Erro na requisição:', error)
  throw error
}

export const getProdutos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/produtos`)
    return response.data
  } catch (error) {
    handleErrors(error)
  }
}

export const getById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/produtos/${id}`)
    return response.data
  } catch (error) {
    handleErrors(error)
  }
}

export const createProduto = async (postData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/produtos`, postData)
    return response.data
  } catch (error) {
    handleErrors(error)
  }
}

export const updateProduto = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/produtos/${id}`, updatedData)
    return response.data
  } catch (error) {
    handleErrors(error)
  }
}

export const deleteProduto = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/produtos/${id}`)
    return response.data
  } catch (error) {
    handleErrors(error)
  }
}
