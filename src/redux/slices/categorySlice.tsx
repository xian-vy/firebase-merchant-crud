import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoryModel } from "../../models/CategoryModel";

const CATEGORY_STATE = "Category State";
interface CategoryState {
  categories: CategoryModel[];
  loading: boolean;
  isfetching: boolean;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  isfetching: false,
};

const categorySlice = createSlice({
  name: CATEGORY_STATE,
  initialState,
  reducers: {
    resetLoadingIncome: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesState.pending, (state) => {
      state.isfetching = true;
    });
    builder.addCase(fetchCategoriesState.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isfetching = false;
    });
  },
});

export const fetchCategoriesState = createAsyncThunk(`${CATEGORY_STATE}/fetch`, async (categories: CategoryModel[]) => {
  return categories;
});

export default categorySlice.reducer;
