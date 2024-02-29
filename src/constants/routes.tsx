import React from "react";
import ProductsMain from "../components/Products/ProductsMain";

export const PRODUCTS_PATH = "/products";
export const CATEGORIES_PATH = "/categories";
export const DASHBOARD_PATH = "/";

export const ROUTES = [
  {
    path: PRODUCTS_PATH,
    element: <ProductsMain />,
    isPrivate: true,
  },
];
