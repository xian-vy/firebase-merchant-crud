import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import React from "react";
interface CustomIconButtonProps {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: React.CSSProperties;
  type: string;
}

const ReusableIconButton: React.FC<CustomIconButtonProps> = ({ children, onClick, style, type }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <IconButton
      onClick={onClick}
      sx={{
        backgroundColor: "inherit",
        border: `solid 1px ${isDarkMode ? "#333" : "#ccc"}`,
        borderRadius: 2,
        py: 0.4,
        pr: 0.4,
        ml: 1,
        ...style,
      }}
    >
      {children}
    </IconButton>
  );
};

export default ReusableIconButton;
