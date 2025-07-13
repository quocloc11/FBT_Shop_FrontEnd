import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authorizedAxiosInstance from '../../../utils/authorizeAxios';
import { API_ROOT } from '../../../utils/constants';

const initialState = {
  carts: [],
  loading: false,
  error: null,
  successMessage: null,
};

export const createCartProductAPI = createAsyncThunk(
  'cart/createCartProductAPI',
  async (product, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.post(`${API_ROOT}/cart`, product);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng');
    }
  }
);

export const getCartProductAPI = createAsyncThunk(
  'cart/getCartProductAPI',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.get(`${API_ROOT}/cart`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Có lỗi xảy ra khi lấy sản phẩm trong giỏ hàng');
    }
  }
);

export const deleteCartProductAPI = createAsyncThunk(
  'cart/deleteCartProductAPI',
  async (id, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.delete(`${API_ROOT}/cart/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng');
    }
  }
);




const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartError: (state) => {
      state.error = null;
    },
    clearCartSuccessMessage: (state) => {
      state.successMessage = null;
    },
    clearCart: (state) => {
      state.carts = [];
      localStorage.removeItem('cart');
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(createCartProductAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCartProductAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload.items;
        state.successMessage = 'Thêm sản phẩm vào giỏ hàng thành công!';
      })


      .addCase(createCartProductAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng';
      })

      .addCase(getCartProductAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartProductAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload.items;
      })
      .addCase(getCartProductAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Có lỗi xảy ra khi lấy sản phẩm trong giỏ hàng';
      })

      .addCase(deleteCartProductAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartProductAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = state.carts.filter(item => item._id !== action.payload._id);
        state.successMessage = 'Đã xóa sản phẩm khỏi giỏ hàng!';
      })

      .addCase(deleteCartProductAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng';
      });
  },
});

export const { clearCart, clearCartError, clearCartSuccessMessage } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.carts;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;
export const selectCartSuccessMessage = (state) => state.cart.successMessage;
export const selectCartIsEmpty = (state) => state.cart.carts.length === 0;

export const cartReducer = cartSlice.reducer;
