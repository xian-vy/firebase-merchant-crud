import { Box, CircularProgress } from "@mui/material";
import React from "react";

const ReusableFallbackLoading = () => {
  return (
    <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center" my={2}>
      <CircularProgress size={20} />
    </Box>
  );
};

export default ReusableFallbackLoading;
