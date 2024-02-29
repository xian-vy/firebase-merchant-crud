import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const useLoadingHook = (loading: boolean) => {
  const LoadingIndicator = () => (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%" my={2}>
      <CircularProgress size={20} />
    </Box>
  );

  return { LoadingIndicator };
};

export default useLoadingHook;
