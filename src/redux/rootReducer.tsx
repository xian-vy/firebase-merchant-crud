import { combineReducers } from "redux";

import themeSlice from "./slices/themeSlice";
import productSlice from "./slices/productSlice";
import categorySlice from "./slices/categorySlice";
const rootReducer = combineReducers({
  theme: themeSlice,
  productsSlice: productSlice,
  categorySlice: categorySlice,
});

export default rootReducer;
