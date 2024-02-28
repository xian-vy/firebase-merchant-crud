import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Box, Dialog, DialogContent, Drawer, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

import BottomNav from "./BottomNav";
import SideNav from "./SideNav";
import { DRAWER_WIDTH, DRAWER_WIDTH_COLLAPSED, ICON_LG } from "../../constants/sizes";
import { DASHBOARD_PATH, PRODUCTS_PATH, CATEGORIES_PATH } from "../../constants/routes";

const NAV_ITEMS = [
  {
    key: "Dashboard",
    path: DASHBOARD_PATH,
    icon: <DashboardOutlinedIcon sx={{ fontSize: ICON_LG }} />,
    text: "Dashboard",
  },
  {
    key: "Menu",
    path: PRODUCTS_PATH,
    icon: <ShoppingBagOutlinedIcon sx={{ fontSize: ICON_LG }} />,
    text: "Menu",
  },
];

const NavigationMain = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isMdScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isLgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isXSScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [drawerSize, setDrawerSize] = useState(isMdScreen && isLgScreen ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH);
  const [collapsedDrawer, setCollapsedDrawer] = useState(false);

  useEffect(() => {
    if (drawerSize === DRAWER_WIDTH_COLLAPSED) {
      setCollapsedDrawer(true);
    } else {
      setCollapsedDrawer(false);
    }
  }, [drawerSize]);

  const handleDrawerCollapse = () => {
    setDrawerSize((prevDrawerSize) => (prevDrawerSize === DRAWER_WIDTH ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH));
  };
  const handleDrawerToggle = () => {
    setDrawerOpen((prevMobileOpen) => !prevMobileOpen);
  };

  const handleSetting = () => {
    handleDrawerToggle();
    setSettingsOpen(true);
  };

  return (
    <div>
      <Box
        component="nav"
        sx={{
          width: { md: drawerSize },
          flexShrink: { md: 0 },
        }}
      >
        <BottomNav isXSScreen={isXSScreen} closeDrawer={handleDrawerToggle} theme={theme} menuItems={NAV_ITEMS} />

        <SideNav
          collapsedDrawer={collapsedDrawer}
          drawerOpen={drawerOpen}
          drawerSize={drawerSize}
          handleAbout={() => setOpenAbout(true)}
          handleSetting={handleSetting}
          menuItems={NAV_ITEMS}
          toggleDrawer={handleDrawerToggle}
          toggleDrawerCollapse={handleDrawerCollapse}
        />
      </Box>

      {/* <Drawer
        anchor="right"
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        PaperProps={{
          sx: { background: isDarkMode ? "#1e1e1e" : "#fff", width: 300 },
        }}
        sx={{ px: 2 }}
        transitionDuration={powerSavingMode ? 0 : undefined}
      >
        <SettingsForm closeForm={() => setSettingsOpen(false)} loading={isLoading} />
      </Drawer> */}
    </div>
  );
};

export default React.memo(NavigationMain);
