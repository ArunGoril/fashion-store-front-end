import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductById, fetchProductsByFilters } from './productAPI';

// initial state
const initialState = {
  products: [],
  selectedProduct: null,
  status: 'idle',
  totalItems: 0
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async (rejectWithValue) => {
    try {
      const response = await fetchAllProducts();
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id, rejectWithValue) => {
    try {
      const response = await fetchProductById(id);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({ filter, sort, pagination }, rejectWithValue) => {
    try {
      const response = await fetchProductsByFilters(filter, sort, pagination);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchAllProductsAsync.rejected, (state, action) => {
        state.status = 'error';
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductsByFiltersAsync.rejected, (state, action) => {
        state.status = 'error';
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
        state.status = 'error';
      })
  },
});

export const selectAllProducts = (state) => state.product.products;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectProductAPIStatus = (state) => state.product.status;

export default productSlice.reducer;