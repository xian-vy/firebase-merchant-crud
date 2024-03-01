import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import React from "react";
import FodderPage from "../components/DummyPage";
import ProductsMain from "../components/Products/ProductsMain";
import { ICON_MD } from "./sizes";
export const PRODUCTS_PATH = "/";
export const CATEGORIES_PATH = "/categories";
export const DASHBOARD_PATH = "/dashbaord";
export const DUMMY_PATH = "/dummypage";

export const ROUTES = [
  {
    path: PRODUCTS_PATH,
    element: <ProductsMain />,
    isPrivate: true,
  },
  {
    path: DUMMY_PATH,
    element: <FodderPage />,
    isPrivate: true,
  },
];

export const NAV_ITEMS = [
  {
    key: "Items",
    path: PRODUCTS_PATH,
    icon: <FormatListBulletedIcon sx={{ fontSize: ICON_MD }} />,
    text: "Items",
  },
  {
    key: "Dummy",
    path: DUMMY_PATH,
    icon: <Person2OutlinedIcon sx={{ fontSize: ICON_MD }} />,
    text: "Dummy",
  },

  { key: "Settings", path: "Settings", icon: <SettingsOutlinedIcon sx={{ fontSize: ICON_MD }} />, text: "Settings" },
];
