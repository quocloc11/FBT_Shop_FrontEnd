import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_ROOT } from '../../../utils/constants';
import authorizedAxiosInstance from '../../../utils/authorizeAxios';

const initialState = {
  products: [],
  currentProduct: null,
  loading: false
}

export const getProductAPI = createAsyncThunk(
  'product/getProductAPI',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.get(`${API_ROOT}/products`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductAPI.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getProductAPI.rejected, (state) => {
        state.loading = false;
      });
  }
})

export const selectProducts = (state) => state.product.products;

export const selectCurrentProduct = (state) => state.product.currentProduct;

export const { setCurrentProduct } = productSlice.actions;

export const productReducer = productSlice.reducer;
