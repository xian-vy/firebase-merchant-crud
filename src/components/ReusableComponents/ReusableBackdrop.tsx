import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const ReusableBackdrop = ({ open }: { open: boolean }) => {
  return (
    <div>
      <Backdrop open={open} sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default ReusableBackdrop;
