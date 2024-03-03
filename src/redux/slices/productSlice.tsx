import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductModel } from "../../models/ProductModel";

const PRODUCT_STATE = "Product State";
interface ProductState {
  products: ProductModel[];
  loading: boolean;
  isfetching: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  isfetching: false,
};

const productSlice = createSlice({
  name: PRODUCT_STATE,
  initialState,
  reducers: {
    resetLoadingIncome: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductState.pending, (state) => {
      state.isfetching = true;
    });
    builder.addCase(fetchProductState.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isfetching = false;
    });
  },
});

export const fetchProductState = createAsyncThunk(`${PRODUCT_STATE}/fetch`, async (products: ProductModel[]) => {
  return products;
});

export default productSlice.reducer;
