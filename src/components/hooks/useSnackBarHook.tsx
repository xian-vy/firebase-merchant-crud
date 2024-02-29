import React from "react";
import ReusableSnackBar from "../ReusableComponents/ReusableSnackBar";

const useSnackbarHook = () => {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const closeSnackbar = () => {
    setSnackbar((prevState) => ({ ...prevState, open: false }));
  };

  const openSuccessSnackbar = (message: string, error?: boolean) => {
    setSnackbar({
      open: true,
      message,
      severity: error ? "error" : "success",
    });
  };

  const SnackbarComponent = (
    <ReusableSnackBar
      open={snackbar.open}
      onClose={closeSnackbar}
      message={snackbar.message}
      severity={snackbar.severity}
    />
  );

  return {
    openSuccessSnackbar,
    SnackbarComponent,
  };
};

export default useSnackbarHook;
