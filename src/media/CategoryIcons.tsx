import IcecreamOutlinedIcon from "@mui/icons-material/IcecreamOutlined";
import LiquorOutlinedIcon from "@mui/icons-material/LiquorOutlined";
import RamenDiningOutlinedIcon from "@mui/icons-material/RamenDiningOutlined";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import CoffeeOutlinedIcon from "@mui/icons-material/CoffeeOutlined";
import SoupKitchenOutlinedIcon from "@mui/icons-material/SoupKitchenOutlined";
import LocalBarOutlinedIcon from "@mui/icons-material/LocalBarOutlined";
import BreakfastDiningOutlinedIcon from "@mui/icons-material/BreakfastDiningOutlined";
import KebabDiningOutlinedIcon from "@mui/icons-material/KebabDiningOutlined";
import LocalPizzaOutlinedIcon from "@mui/icons-material/LocalPizzaOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import React from "react";

const CategoryIcons = [
  { name: "Dine", icon: <RamenDiningOutlinedIcon /> },
  { name: "IceCream", icon: <IcecreamOutlinedIcon /> },
  { name: "Drinks", icon: <LiquorOutlinedIcon /> },
  { name: "Uncategorized", icon: <QuestionMarkOutlinedIcon /> },
  { name: "Coffee", icon: <CoffeeOutlinedIcon /> },
  { name: "Soup", icon: <SoupKitchenOutlinedIcon /> },
  { name: "Liquor", icon: <LocalBarOutlinedIcon /> },
  { name: "Bread", icon: <BreakfastDiningOutlinedIcon /> },
  { name: "BBQ", icon: <KebabDiningOutlinedIcon /> },
  { name: "Pizza", icon: <LocalPizzaOutlinedIcon /> },
  { name: "Cake", icon: <CakeOutlinedIcon /> },
  { name: "", icon: <DoDisturbAltOutlinedIcon /> },
];

export default CategoryIcons;
