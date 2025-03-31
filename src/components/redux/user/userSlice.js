import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_ROOT } from '../../../utils/constants';
import authorizedAxiosInstance from '../../../utils/authorizeAxios';
import { toast } from 'react-toastify';

const initialState = {
  currentUser: null
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




export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  //extrareducers: noi xu ly du lieu bat dong bo
  extraReducers: (builder) => {
    builder.addCase(loginAPI.fulfilled, (state, action) => {
      const user = action.payload
      console.log('user', user)
      state.currentUser = user
    })
    builder.addCase(logOutAPI.fulfilled, (state) => {
      state.currentUser = null
    })
    // builder.addCase(updateUserAPI.fulfilled, (state, action) => {
    //   const user = action.payload
    //   state.currentUser = user
    // })
  }
})

// Action creators are generated for each case reducer function
export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

export const userReducer = userSlice.reducer