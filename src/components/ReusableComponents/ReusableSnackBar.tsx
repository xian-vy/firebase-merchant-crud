import React from "react";
import { Snackbar, Alert, Slide, SlideProps } from "@mui/material";

interface CustomSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity: "error" | "success" | "info" | "warning";
}
function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

const ReusableSnackBar: React.FC<CustomSnackbarProps> = ({ open, onClose, message, severity }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={severity === "error" ? 8000 : 4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      TransitionComponent={SlideTransition}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ReusableSnackBar;
