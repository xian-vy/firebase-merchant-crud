import { Button, Dialog, DialogActions, DialogTitle, Typography, useTheme } from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  itemDescription: string;
}

const DeleteConfirmationDialog = ({ open, onConfirm, onCancel, itemDescription }: Props) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  return (
    <div>
      <Dialog
        open={open}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, background: isDarkMode ? "#1e1e1e" : "#fff", px: { xs: 1, sm: 2 }, py: 1 },
        }}
      >
        <DialogTitle sx={{ py: 1 }} align="center">
          <Typography variant="caption">Are you sure want to delete the item?</Typography>
          <Typography>{itemDescription}</Typography>
        </DialogTitle>

        <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button sx={{ minWidth: 140 }} variant="outlined" color="warning" onClick={onCancel}>
            Cancel
          </Button>
          <Button sx={{ minWidth: 140 }} variant="outlined" color="error" onClick={onConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteConfirmationDialog;
