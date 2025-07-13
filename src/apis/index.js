import { API_ROOT } from '../utils/constants.js'
import authorizedAxiosInstance from '../utils/authorizeAxios.js'
export const registerAPI = async (Data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/users/register`, Data)
  return response.data
}

export const getProductAPI = async ({ page, limit, category } = {}) => {
  const params = new URLSearchParams();

  if (page !== undefined) params.append('page', page);
  if (limit !== undefined) params.append('limit', limit);
  if (category) params.append('category', category); // ← thêm category vào

  const url = `${API_ROOT}/products?${params.toString()}`;

  const response = await authorizedAxiosInstance.get(url);
  return response.data;
};


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

export const updatedSaleProductAPI = async (id, flaseSale) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/products/${id}/flash-sales`, flaseSale)
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

export const addCommentsAPI = async (id, Data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/comments/${id}`, Data)
  return response.data
}
export const getCommentsAPI = async (id) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/comments/${id}`)
  return response.data
}

export const deleteCommentsAPI = async (id, commentId) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/comments/${id}/${commentId}`)
  return response.data
}

export const searchProductAPI = async (keyword) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/products/search/?keyword=${encodeURIComponent(keyword)}`);
  return response.data;
};


