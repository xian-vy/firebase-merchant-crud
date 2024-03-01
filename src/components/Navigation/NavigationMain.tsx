import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DRAWER_WIDTH, DRAWER_WIDTH_COLLAPSED } from "../../constants/sizes";
import SettingsMain from "../Settings/SettingsMain";
import BottomNav from "./BottomNav";
import SideNav from "./SideNav";
import { NAV_ITEMS } from "../../constants/routes";

const NavigationMain = () => {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isLgScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isXSScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
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
    setSettingsOpen(true);
    setDrawerOpen(false);
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
        <BottomNav
          isXSScreen={isXSScreen}
          closeDrawer={handleDrawerToggle}
          theme={theme}
          menuItems={NAV_ITEMS}
          handleSetting={handleSetting}
        />

        <SideNav
          collapsedDrawer={collapsedDrawer}
          drawerOpen={drawerOpen}
          drawerSize={drawerSize}
          handleSetting={handleSetting}
          menuItems={NAV_ITEMS}
          toggleDrawer={handleDrawerToggle}
          toggleDrawerCollapse={handleDrawerCollapse}
        />
      </Box>

      <SettingsMain onClose={() => setSettingsOpen(false)} open={settingsOpen} />
    </div>
  );
};

export default React.memo(NavigationMain);
