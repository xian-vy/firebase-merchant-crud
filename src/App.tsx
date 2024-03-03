import { ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoutes";
import ReusableFallbackLoading from "./components/ReusableComponents/ReusableFallbackLoading";
import { COLLECTIONS } from "./constants/collections";
import { ROUTES } from "./constants/routes";
import { useFetchItems } from "./firebase/hooks/useFetchItemsHook";
import { populateInitialCategories } from "./firebase/inititalCategories";
import { CategoryModel } from "./models/CategoryModel";
import { ProductModel } from "./models/ProductModel";
import { fetchCategoriesState } from "./redux/slices/categorySlice";
import { fetchProductState } from "./redux/slices/productSlice";
import { RootState } from "./redux/store";
function App() {
  const dispatch = useDispatch<ThunkDispatch<RootState, any, any>>();

  /* DEFAULT CATEGORIES -----------------------------------*/
  useEffect(() => {
    populateInitialCategories();
  }, []);

  /* CATEGORIES STATE--------------------------------------*/
  const {
    items: categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useFetchItems<CategoryModel>(COLLECTIONS.Categories);

  useEffect(() => {
    if (errorCategories) {
      console.error("Error in fetching categories", errorCategories);
      return;
    }
    if (!loadingCategories && categories) {
      dispatch(fetchCategoriesState(categories));
    }
  }, [categories, loadingCategories, errorCategories, dispatch]);

  /* PRODUCTS STATE----------------------------------------*/
  const {
    items: products,
    loading: loadingProducts,
    error: errorProducts,
  } = useFetchItems<ProductModel>(COLLECTIONS.Products);

  useEffect(() => {
    if (errorProducts) {
      console.error("Error in fetching products", errorProducts);
      return;
    }
    if (!loadingProducts && products) {
      dispatch(fetchProductState(products));
    }
  }, [products, loadingProducts, errorProducts, dispatch]);

  return (
    <div className="App">
      <Router>
        <ErrorBoundary>
          <Routes>
            {ROUTES.map((route) => {
              const RouteElement = (
                <React.Suspense fallback={<ReusableFallbackLoading />}>{route.element}</React.Suspense>
              );

              if (route.isPrivate) {
                return (
                  <Route key={route.path} path={route.path} element={<ProtectedRoute />}>
                    <Route index element={RouteElement} />
                  </Route>
                );
              } else {
                return <Route key={route.path} path={route.path} element={<PublicRoute>{RouteElement}</PublicRoute>} />;
              }
            })}
          </Routes>
        </ErrorBoundary>
      </Router>
    </div>
  );
}

export default React.memo(App);
