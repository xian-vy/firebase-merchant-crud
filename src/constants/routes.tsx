import React from "react";
import ProductsMain from "../components/Products/ProductsMain";
import DashboardMain from "../components/Dashboard/DashboardMain";

export const PRODUCTS_PATH = "/products";
export const CATEGORIES_PATH = "/categories";
export const DASHBOARD_PATH = "/";

export const ROUTES = [
  {
    path: DASHBOARD_PATH,
    element: <DashboardMain />,
    isPrivate: true,
  },
  {
    path: PRODUCTS_PATH,
    element: <ProductsMain />,
    isPrivate: true,
  },
];
