import { Box, Divider, Drawer, IconButton, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import CloseIcon from "@mui/icons-material/Close";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { ThemeColor } from "../../utils/utils";

interface Props {
  open: boolean;
  onClose: () => void;
}
const SettingsMain = ({ open, onClose }: Props) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: { background: isDarkMode ? "#1e1e1e" : "#fff", width: 300 },
        }}
        sx={{ p: 2 }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
          px={3}
          py={{ xs: 0.5, lg: 1 }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <div style={{ display: "flex", alignItems: "center" }}>
                <SettingsOutlinedIcon sx={{ color: ThemeColor(theme), mr: 1, fontSize: "16px" }} />
                <Typography textAlign="left" variant="body1" sx={{ color: ThemeColor(theme) }}>
                  Settings
                </Typography>
              </div>
              <IconButton onClick={onClose} sx={{ mr: -1 }}>
                <CloseIcon
                  style={{
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                />
              </IconButton>
            </Stack>

            <Divider sx={{ marginBottom: "10px" }} />
            <Typography variant="caption" textAlign="center">
              Theme
            </Typography>
            <Stack direction="row" justifyContent="center" mb={1}>
              <ThemeToggle />
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default SettingsMain;
