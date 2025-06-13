import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_ROOT } from '../../../utils/constants';
import authorizedAxiosInstance from '../../../utils/authorizeAxios';
import { toast } from 'react-toastify';

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  users: [],  // Đảm bảo rằng 'users' được khởi tạo là một mảng rỗng
  filteredUsers: [], // Khởi tạo filteredUsers là mảng rỗng
  isLoading: false, // Thêm isLoading để xử lý trạng thái tải
}


export const loginAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.post(`${API_ROOT}/users/login`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const logOutAPI = createAsyncThunk(
  'user/logOutUserAPI',
  async (showSuccessMessage = true) => {

    const response = await authorizedAxiosInstance.delete(`${API_ROOT}/users/logout`);
    if (showSuccessMessage) {
      toast.success('Logged out successfully!')
    }
    return response.data
  }
)

export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/users/update`, data)
    return response.data
  }
)
export const editUserAPI = createAsyncThunk(
  'user/editUserAPI',
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.patch(`${API_ROOT}/users/users/${userId}`, data)
      toast.success('User edited successfully!')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const deleteUserAPI = createAsyncThunk(
  'user/deleteUserAPI',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.delete(`${API_ROOT}/users/users/${userId}`) // Sử dụng phương thức DELETE thay vì PATCH
      toast.success('User deleted successfully!')
      return { userId } // trả về userId để redux remove
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)


export const fetchAllUsers = createAsyncThunk(
  'users/fetchAll',
  async ({ role, limit, skip } = {}, { rejectWithValue }) => {
    try {
      const response = await authorizedAxiosInstance.get(`${API_ROOT}/users/users`, {
        params: { role, limit, skip }
      })
      console.log('response.data', response)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = user
      localStorage.setItem('currentUser', JSON.stringify(user))
    })
    builder.addCase(logOutAPI.fulfilled, (state) => {
      state.currentUser = null
      localStorage.removeItem('currentUser')
    })
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.currentUser = { ...user } // ✅ tạo object mới
      localStorage.setItem('currentUser', JSON.stringify(user))
    })
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.users = action.payload // Lưu tất cả người dùng vào 'users'
      state.filteredUsers = action.payload // Cập nhật filteredUsers
    })
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.isLoading = true // Đánh dấu trạng thái đang tải
    })
    builder.addCase(fetchAllUsers.rejected, (state) => {
      state.isLoading = false // Dừng trạng thái tải khi có lỗi
    })
    builder.addCase(editUserAPI.fulfilled, (state, action) => {
      const updatedUser = action.payload;

      // Cập nhật trong danh sách users và filteredUsers
      state.users = state.users.map(user => user._id === updatedUser._id ? updatedUser : user);
      state.filteredUsers = state.filteredUsers.map(user => user._id === updatedUser._id ? updatedUser : user);

      if (state.currentUser && state.currentUser._id === updatedUser._id) {
        state.currentUser = updatedUser;
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        if (updatedUser.role !== 'admin') {
          state.currentUser = null;
          localStorage.removeItem('currentUser');
          toast.info('Your role has changed. Please login again.');
        }
      }

    });

    builder.addCase(deleteUserAPI.fulfilled, (state, action) => {
      const { userId } = action.payload

      console.log("Before removing user, state.users:", state.users);
      state.users = state.users.filter(user => user._id !== userId)
      state.filteredUsers = state.filteredUsers.filter(user => user._id !== userId)
      if (state.currentUser && state.currentUser._id === userId) {
        state.currentUser = null;
        localStorage.removeItem('currentUser'); // Xóa dữ liệu người dùng khỏi localStorage
        console.log("Current user logged out and removed from localStorage.");
      }
      console.log("After removing user, state.users:", state.users);
    })
  }
})

// Action creators are generated for each case reducer function
export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

export const userReducer = userSlice.reducer