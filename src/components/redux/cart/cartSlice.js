import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authorizedAxiosInstance from '../../../utils/authorizeAxios';
import { API_ROOT } from '../../../utils/constants';

// Trạng thái ban đầu
const initialState = {
  carts: [], // Danh sách sản phẩm trong giỏ hàng
  loading: false, // Trạng thái tải dữ liệu
  error: null, // Thông tin lỗi (nếu có)
  successMessage: null, // Thông báo thành công
};

// Thunk cho các tác vụ bất đồng bộ (API)
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




// Slice cho giỏ hàng
const cartSlice = createSlice({
  name: 'cart', // Tên của slice
  initialState, // Trạng thái ban đầu
  reducers: {
    // Hành động để xóa thông báo lỗi
    clearCartError: (state) => {
      state.error = null;
    },
    // Hành động để xóa thông báo thành công
    clearCartSuccessMessage: (state) => {
      state.successMessage = null;
    },
    // Hành động để xóa toàn bộ giỏ hàng
    clearCart: (state) => {
      state.carts = [];
      console.log('[clearCart] carts đã bị xóa:', state.carts);
      localStorage.removeItem('cart'); // Chỉ cần nếu bạn thực sự dùng localStorage
    }

  },
  extraReducers: (builder) => {
    builder
      // Thêm sản phẩm vào giỏ hàng
      .addCase(createCartProductAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCartProductAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload.items; // ✅ chỉ lấy mảng sản phẩm
        state.successMessage = 'Thêm sản phẩm vào giỏ hàng thành công!';
      })


      .addCase(createCartProductAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng';
      })

      // Lấy danh sách sản phẩm trong giỏ hàng
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

      // Xóa sản phẩm khỏi giỏ hàng
      .addCase(deleteCartProductAPI.pending, (state) => {
        state.loading = true;
      })
      // .addCase(deleteCartProductAPI.fulfilled, (state, action) => {
      //   state.loading = false;
      //   // Cập nhật giỏ hàng sau khi xóa sản phẩm
      //   // Kiểm tra nếu sản phẩm có trong giỏ hàng
      //   state.carts.items = state.carts.items.filter(item => item._id !== action.payload._id);

      //   state.successMessage = 'Đã xóa sản phẩm khỏi giỏ hàng!';
      // })
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

// Xuất các hành động để sử dụng trong component
export const { clearCart, clearCartError, clearCartSuccessMessage } = cartSlice.actions;

// Các selector để lấy dữ liệu từ store
export const selectCartItems = (state) => state.cart.carts;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;
export const selectCartSuccessMessage = (state) => state.cart.successMessage;
export const selectCartIsEmpty = (state) => state.cart.carts.length === 0;

// Xuất reducer để dùng trong store
export const cartReducer = cartSlice.reducer;
