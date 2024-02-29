import { Button, IconButton, InputAdornment, InputBase, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { ICON_MD, ICON_SM } from "../../constants/sizes";
import AddIcon from "@mui/icons-material/Add";
import ReusableIconButton from "../ReusableComponents/ReusableIconButton";

interface Props {
  onAddNewProduct: () => void;
  onSearch: (search: string) => void;
}
const ProductListHeader = ({ onAddNewProduct, onSearch }: Props) => {
  const [searchValue, setSearchValue] = React.useState("");
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    onSearch("");
  };

  return (
    <div>
      <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" px={2}>
        <Stack
          sx={{
            border: `solid 1px ${isDarkMode ? "#333" : "#ccc"} `,
            borderRadius: 2,
            textAlign: "left",
            flexGrow: 1,
            minWidth: { xs: "auto", sm: 120, md: 230, lg: 300 },
            // maxWidth: { md: 300, lg: 400 },
            pl: 0.5,
            ml: { xs: 0, sm: 1 },
          }}
        >
          <InputBase
            onChange={handleSearchChange}
            placeholder="Search by description"
            value={searchValue}
            startAdornment={<SearchOutlinedIcon sx={{ fontSize: ICON_SM, mr: 0.5 }} />}
            endAdornment={
              searchValue && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClearSearch} size="small">
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }
            style={{
              paddingLeft: 5,
            }}
          />
        </Stack>

        <ReusableIconButton onClick={onAddNewProduct} type="filter">
          <Typography variant="caption">New</Typography>
          <AddIcon sx={{ fontSize: ICON_MD }} />
        </ReusableIconButton>
      </Stack>
    </div>
  );
};

export default ProductListHeader;
