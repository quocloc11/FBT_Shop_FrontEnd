import { API_ROOT } from '../utils/constants.js'
import authorizedAxiosInstance from '../utils/authorizeAxios.js'

// export const fetchBoardDetailsAPI = async (boardId) => {
//   const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
//   return response.data
// }

// export const loginAPI = async (Data) => {
//   const response = await authorizedAxiosInstance.post(`${API_ROOT}/users/login`, Data)
//   return response.data
// }

export const registerAPI = async (Data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/users/register`, Data)
  return response.data
}

export const getProductAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/products`)
  return response.data
}

export const createProductAPI = async (productData) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/products`, productData)
  return response.data
}

export const updatedProductAPI = async (id, productData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/products/${id}`, productData)
  return response.data
}



export const deleteAProductAPI = async (id) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/products/${id}`)
  return response.data
}

export const refreshTokenAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/users/refresh_token`)
  return response.data
}


export const createSaleProductAPI = async (salesProductData) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/flash-sales`, salesProductData)
  return response.data
}
export const getSaleProductAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/flash-sales/active`)
  return response.data
}
export const updatedSaleProductAPI = async (id, productData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/flash-sales/${id}`, productData)
  return response.data
}



export const deleteSaleAProductAPI = async (id) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/flash-sales/${id}`)
  return response.data
}

export const addViewProductAPI = async (productData) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/viewed-products`, productData)
  return response.data
}

export const viewProductAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/viewed-products`)
  return response.data
}