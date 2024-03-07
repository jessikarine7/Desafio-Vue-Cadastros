import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const getClient = async () => {
  const response = await axios.get(`${API_BASE_URL}/clientes`);
  const produtoBaseUrl = `${API_BASE_URL}/produtos`;

  const clientProduct = response.data.map(async (cliente) => {
    const productId = cliente.produto || [];
    const produtos = [];

    for (const id of productId) {
      const produto = await axios.get(`${produtoBaseUrl}?id=${id}`);

      produtos.push({ nome: produto.data[0].nome, id: produto.data[0].id })
    };

    return {...cliente, produtos };
  });

  return await Promise.all(clientProduct);
};

export const getById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/clientes/${id}`);
  return response.data
};

export const createClient = async (postData) => {  
  const response = await axios.post(`${API_BASE_URL}/clientes`, postData)
  return response.data
};

export const updateClient = async (id, updatedData) => {
  const response = await axios.put(`${API_BASE_URL}/clientes/${id}`, updatedData)
  return response.data
};

// export const deleteClientes = async (id) => {
//   const response = await axios.delete(`${API_BASE_URL}/clientes/${id}`)
//   return response.data
// };