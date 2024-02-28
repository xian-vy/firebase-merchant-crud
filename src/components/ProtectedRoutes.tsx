import { Box, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { darkTheme, lightTheme } from "../Theme";
import { DASHBOARD_PATH } from "../constants/routes";
import { DRAWER_WIDTH } from "../constants/sizes";
import { RootState } from "../redux/store";
import NavigationMain from "./Navigation/NavigationMain";

interface ProtectedRouteProps {
  redirectPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = DASHBOARD_PATH }) => {
  const deviceTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const darktheme = useSelector((state: RootState) => state.theme.darkMode);
  const location = useLocation();

  return (
    <ThemeProvider
      theme={darktheme === null ? (deviceTheme ? darkTheme : lightTheme) : darktheme ? darkTheme : lightTheme}
    >
      <Box sx={{ display: "flex", height: "100vh" }}>
        <CssBaseline />
        <NavigationMain />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            px: { xs: 1, sm: 2, xl: 4 },
            py: { xs: 2, sm: 2, xl: 4 },
            width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
            overflowX: "hidden",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
