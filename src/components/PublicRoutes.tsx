import { ThemeProvider } from "@mui/material";
import React, { ReactNode } from "react";
import { darkTheme } from "../Theme";
interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
    </>
  );
};

export default PublicRoute;
