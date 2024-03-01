import React from "react";
import { TextField } from "@mui/material";
import { isValidInput } from "../../utils/utils";

interface Props {
  label: string;
  value: number | string;
  onValueChange: (value: number) => void;
}

const ReusableNumericTextfield: React.FC<Props> = ({ label, value, onValueChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isValidInput(value) && value.length <= 8) {
      onValueChange(parseFloat(value) || 0);
    }
  };

  return (
    <TextField
      label={label}
      variant="outlined"
      size="small"
      required
      fullWidth
      inputMode="numeric"
      inputProps={{ inputMode: "numeric" }}
      value={value}
      onChange={handleChange}
    />
  );
};

export default ReusableNumericTextfield;
