import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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
import { Link, useLocation } from "react-router-dom";
import { ICON_SM } from "../../constants/sizes";
import UserAccount from "./UserAccount";

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
};

const SideNav = ({
  menuItems,
  toggleDrawer,
  drawerSize,
  collapsedDrawer,
  toggleDrawerCollapse,
  drawerOpen,
  handleSetting,
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
        py: { xs: 1.5, md: 1 },
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
        <UserAccount collapsedDrawer={collapsedDrawer} />
        {menuItems.map((item) => (
          <List key={item.key} sx={{ mx: collapsedDrawer ? 1 : 3, height: "32px", pt: 0, mt: 1 }}>
            <ListItem disablePadding sx={{ minWidth: collapsedDrawer ? "40px" : "auto" }}>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  border:
                    location.pathname === item.path
                      ? isDarkMode
                        ? "1px solid #333"
                        : "1px solid #ccc"
                      : "solid 1px transparent",
                  py: 0.4,
                  borderRadius: 4,
                  display: "flex",
                  justifyContent: "center",
                  px: collapsedDrawer ? 0.5 : 2,
                }}
                onClick={(event) => {
                  if (item.key === "Settings") {
                    event.preventDefault();
                    handleSetting();
                  } else if (!isMdScreen) {
                    toggleDrawer();
                  }
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
          justifyContent={{ xs: "center", md: collapsedDrawer ? "center" : "flex-end" }}
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
