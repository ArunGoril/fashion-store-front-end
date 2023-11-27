import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder} from './orderAPI';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder: null
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order, rejectWithValue) => {
    try {
      const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
    } catch (error) {
      // The value we return becomes the `rejected` action payload
      return rejectWithValue(error);
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createOrderAsync.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const {resetOrder} = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrderAPIStatus = (state) => state.order.status;

export default orderSlice.reducer;