import AddIcon from "@mui/icons-material/Add";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { Button, CircularProgress, Stack } from "@mui/material";
import React from "react";
import { FORM_BUTTON_WIDTH } from "../../constants/sizes";

interface EntryFormButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
  isEditMode?: boolean;
  type: "Create" | "Cancel" | "Update";
  onCancel?: () => void;
  order?: number;
  soloButton?: boolean;
}

const ReusableFormActionButton: React.FC<EntryFormButtonProps> = ({
  disabled,
  isLoading,
  isEditMode,
  type,
  onCancel,
  order,
  soloButton,
}) => {
  let buttonColor: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" = "inherit";
  let buttonText = "CREATE";
  let endIcon = <AddIcon />;

  if (isEditMode) {
    buttonColor = "info";
    buttonText = "UPDATE";
    endIcon = <CheckOutlinedIcon />;
  } else if (type === "Cancel") {
    buttonColor = "warning";
    buttonText = "CANCEL";
    endIcon = <CloseIcon />;
  } else if (type === "Create") {
    buttonColor = "success";
    buttonText = "CREATE";
  }

  return (
    <Stack
      sx={{
        order: { xs: order, sm: 0 }, //0 in sm to make it to default order
        width: { xs: "100%", sm: "auto" },
      }}
    >
      <Button
        size="large"
        disabled={disabled || isLoading}
        variant="outlined"
        type={type === "Cancel" ? "button" : "submit"}
        color={buttonColor}
        endIcon={isLoading && type !== "Cancel" ? <CircularProgress size={20} color="inherit" /> : endIcon}
        sx={{
          width: { xs: "100%", sm: soloButton ? "100%" : FORM_BUTTON_WIDTH },
          mb: { xs: 1, sm: 0 },
        }}
        onClick={onCancel}
      >
        {isLoading ? (isEditMode ? "UPDATING.." : "SAVING..") : buttonText}
      </Button>
    </Stack>
  );
};

export default ReusableFormActionButton;
