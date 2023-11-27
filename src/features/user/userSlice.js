import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUser, fetchLoggedInUserOrders, updateUser } from './userAPI';

const initialState = {
  userOrders: [],
  status: 'idle',
  userInfo: null
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (userId, rejectWithValue) => {
    try {
      const response = await fetchLoggedInUserOrders(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (userId, rejectWithValue) => {
    try {
      const response = await fetchLoggedInUser(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update, rejectWithValue) => {
    try {
      const response = await updateUser(update);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
      })
      .addCase(fetchLoggedInUserOrdersAsync.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserAPIStatus = (state) => state.user.status;

export default userSlice.reducer;