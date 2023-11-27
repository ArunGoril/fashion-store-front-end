import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteItemFromCart, fetchCartItemsByUserId, resetCart, updateCart } from './cartAPI';

const initialState = {
  cartItems: [],
  status: 'idle',
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item, rejectWithValue) => {
    try {
      const response = await addToCart(item);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCartItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchCartItemsByUserId',
  async (userId, rejectWithValue) => {
    try {
      const response = await fetchCartItemsByUserId(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update, rejectWithValue) => {
    try {
      const response = await updateCart(update);
    return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (itemId, rejectWithValue) => {
    try {
      const response = await deleteItemFromCart(itemId);
    return response.data._id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (userId, rejectWithValue) => {
    try {
      const response = await resetCart(userId);
    return response.status;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cartItems.push(action.payload);
      })
      .addCase(addToCartAsync.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchCartItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItemsByUserIdAsync.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.cartItems.findIndex(item => item._id === action.payload._id)
        state.cartItems[index] = action.payload;
      })
      .addCase(updateCartAsync.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.cartItems.findIndex(item => item._id === action.payload)
        state.cartItems.splice(index, 1);
      })
      .addCase(deleteItemFromCartAsync.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cartItems = [];
      })
      .addCase(resetCartAsync.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartAPIStatus = (state) => state.cart.status;

export default cartSlice.reducer;