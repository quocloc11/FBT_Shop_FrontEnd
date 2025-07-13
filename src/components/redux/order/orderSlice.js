import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authorizedAxiosInstance from '../../../utils/authorizeAxios';
import { API_ROOT } from '../../../utils/constants';

const initialState = {
  orders: [],
};

export const createOrderProductAPI = createAsyncThunk(
  'orders/createOrderProductAPI',
  async (order, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.post(`${API_ROOT}/order`, order);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getOrderProductAPI = createAsyncThunk(
  'orders/getOrderProductAPI',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.get(`${API_ROOT}/order`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getOrderByIdProductAPI = createAsyncThunk(
  'orders/getOrderByIdProductAPI',
  async (id, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.get(`${API_ROOT}/order/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteOrderProductAPI = createAsyncThunk(
  'orders/deleteOrderProductAPI',
  async (id, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.delete(`${API_ROOT}/order/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const statusOrderProductAPI = createAsyncThunk(
  'orders/statusOrderProductAPI',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.patch(`${API_ROOT}/order/${id}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrderProductAPI.fulfilled, (state, action) => {
      const order = action.payload
      state.orders.push(order);
    })

    builder.addCase(getOrderProductAPI.fulfilled, (state, action) => {
      const order = action.payload
      state.orders = order
    })
    builder.addCase(getOrderByIdProductAPI.fulfilled, (state, action) => {
      const order = [action.payload]
      state.orders = order
    })

    builder.addCase(deleteOrderProductAPI.fulfilled, (state, action) => {

      state.orders = state.orders.filter((order) => order._id !== action.payload._id);

    })


    builder.addCase(statusOrderProductAPI.fulfilled, (state, action) => {
      const updatedOrder = action.payload;
      const index = state.orders.findIndex((order) => order._id === updatedOrder._id);
      if (index !== -1) {
        state.orders[index] = updatedOrder;
      }
    })

  },
});

export const selectOrders = (state) => state.orders.orders;

export const orderReducer = orderSlice.reducer;
