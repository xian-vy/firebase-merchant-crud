import IcecreamOutlinedIcon from "@mui/icons-material/IcecreamOutlined";
import LiquorOutlinedIcon from "@mui/icons-material/LiquorOutlined";
import RamenDiningOutlinedIcon from "@mui/icons-material/RamenDiningOutlined";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import QuestionMarkOutlinedIcon from "@mui/icons-material/QuestionMarkOutlined";
import React from "react";

const CategoryIcons = [
  { name: "Dine", icon: <RamenDiningOutlinedIcon /> },
  { name: "IceCream", icon: <IcecreamOutlinedIcon /> },
  { name: "Drinks", icon: <LiquorOutlinedIcon /> },
  { name: "Uncategorized", icon: <QuestionMarkOutlinedIcon /> },
  { name: "", icon: <DoDisturbAltOutlinedIcon /> },
];

export default CategoryIcons;
