import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import React from "react";
import MenuMain from "../components/Menu/MenuMain";
import ProductsMain from "../components/Products/ProductsMain";
import { ICON_MD } from "./sizes";
export const PRODUCTS_PATH = "/";
export const CATEGORIES_PATH = "/categories";
export const DASHBOARD_PATH = "/dashbaord";
export const DUMMY_PATH = "/dummypage";
export const MENU_PATH = "/menu";
export const ROUTES = [
  {
    path: PRODUCTS_PATH,
    element: <ProductsMain />,
    isPrivate: true,
  },
  {
    path: MENU_PATH,
    element: <MenuMain />,
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
    key: "Menu",
    path: MENU_PATH,
    icon: <MenuBookOutlinedIcon sx={{ fontSize: ICON_MD }} />,
    text: "Menu",
  },

  { key: "Settings", path: "Settings", icon: <SettingsOutlinedIcon sx={{ fontSize: ICON_MD }} />, text: "Settings" },
];
