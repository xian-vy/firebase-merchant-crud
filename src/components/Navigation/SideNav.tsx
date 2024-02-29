import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link, useLocation } from "react-router-dom";
import { ICON_SM } from "../../constants/sizes";

type MenuItemsType = {
  key: string;
  path: string;
  icon: JSX.Element;
  text: string;
};
type Props = {
  menuItems: MenuItemsType[];
  toggleDrawer: () => void;
  drawerSize: number;
  collapsedDrawer: boolean;
  toggleDrawerCollapse: () => void;
  drawerOpen: boolean;
  handleSetting: () => void;
  handleAbout: () => void;
};

const SideNav = ({
  menuItems,
  toggleDrawer,
  drawerSize,
  collapsedDrawer,
  toggleDrawerCollapse,
  drawerOpen,
  handleSetting,
  handleAbout,
}: Props) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const location = useLocation();

  const isMdScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isXSScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const drawerStyles = React.useMemo(
    () => ({
      "& .MuiDrawer-paper": {
        boxSizing: "border-box",
        height: { xs: "auto", sm: "100vh" },
        width: { xs: "96%", sm: drawerSize },
        pb: { xs: 1.5, md: 0 },
        mx: { xs: "auto", md: 0 },
        borderTopLeftRadius: { xs: 10, sm: 0 },
        borderTopRightRadius: { xs: 10, sm: 0 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: isDarkMode ? "#1e1e1e" : "#fff",
        borderRight: isDarkMode ? "none" : `solid 1px ${theme.palette.divider}`,
      },
    }),
    [isMdScreen, isDarkMode, drawerSize]
  );

  const drawer = React.useMemo(
    () => (
      <div>
        {menuItems.map((item) => (
          <List key={item.key} sx={{ mx: collapsedDrawer ? 1 : 3, height: "31px", pt: 0, mt: 1 }}>
            <ListItem disablePadding sx={{ minWidth: collapsedDrawer ? "40px" : "auto" }}>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  backgroundColor: location.pathname === item.path ? (isDarkMode ? "#333" : "#eaeaea") : "",
                  py: 0.4,
                  borderRadius: 4,
                  display: "flex",
                  justifyContent: "center",
                  px: collapsedDrawer ? 0.5 : 2,
                }}
                onClick={(event) => {
                  toggleDrawer();
                }}
              >
                <ListItemIcon
                  style={{
                    minWidth: collapsedDrawer ? "20px" : "35px",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                {!collapsedDrawer && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          </List>
        ))}
      </div>
    ),
    [location, isDarkMode, collapsedDrawer]
  );
  return (
    <div>
      <Drawer
        variant={isMdScreen ? "permanent" : "temporary"}
        sx={drawerStyles}
        open={drawerOpen}
        onClose={toggleDrawer}
        anchor={isXSScreen ? "bottom" : "left"}
      >
        <div>{drawer}</div>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={{ xs: "center", md: collapsedDrawer ? "center" : "space-between" }}
          mt={2}
          mb={1}
          px={2}
        >
          {/* Collapse Icons -----------------------------------------------------------------------*/}
          {isMdScreen && (
            <Stack direction="row">
              {collapsedDrawer ? (
                <IconButton onClick={toggleDrawerCollapse}>
                  <ArrowForwardIcon sx={{ fontSize: ICON_SM }} />
                </IconButton>
              ) : (
                <IconButton onClick={toggleDrawerCollapse}>
                  <ArrowBackIcon sx={{ fontSize: ICON_SM }} />
                </IconButton>
              )}
            </Stack>
          )}
        </Stack>
      </Drawer>
    </div>
  );
};

export default React.memo(SideNav);
