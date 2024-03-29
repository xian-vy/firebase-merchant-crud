import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { Button, Divider, Paper, Skeleton, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setDarkMode, toggleDarkMode } from "../../redux/slices/themeSlice";
import { ThemeColor } from "../../utils/utils";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const currentMode = useSelector((state: RootState) => state.theme.darkMode);

  const handleDarkMode = (newMode: boolean | null) => {
    if (newMode !== currentMode) {
      setDarkMode(newMode);
      dispatch(toggleDarkMode(newMode));
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{ borderRadius: 2, display: "flex", justifyContent: "space-between", background: "none", width: 150 }}
          variant="outlined"
        >
          <Button sx={{ py: 0.3, px: 0, minWidth: 35 }} onClick={() => handleDarkMode(false)}>
            <LightModeOutlinedIcon
              sx={{ fontSize: "18px", color: currentMode === false ? theme.palette.primary.main : ThemeColor(theme) }}
            />
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button
            sx={{
              py: 0.3,
              px: 1,
              minWidth: 35,
              color: currentMode === null ? theme.palette.primary.main : ThemeColor(theme),
              textTransform: "none",
            }}
            onClick={() => handleDarkMode(null)}
          >
            System
          </Button>
          <Divider orientation="vertical" flexItem />
          <Button sx={{ py: 0.3, px: 0, minWidth: 35 }} onClick={() => handleDarkMode(true)}>
            <DarkModeOutlinedIcon
              sx={{ fontSize: "17px", color: currentMode === true ? theme.palette.primary.main : ThemeColor(theme) }}
            />
          </Button>
        </Paper>
      </div>
    </>
  );
};

export default ThemeToggle;
