import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { ProductModel } from "../../models/ProductModel";
import { formatNumberWithoutCurrency } from "../../utils/utils";

interface Props {
  open: boolean;
  product: ProductModel;
  onCancel: () => void;
}
const ProductWithVariantDialog = ({ open, product, onCancel }: Props) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const variantCount = product.variants?.length;
  const [selectedVariant, setSelectedVariant] = React.useState<number | null>(null);

  return (
    <div>
      <Dialog
        onClose={onCancel}
        open={open}
        PaperProps={{
          sx: { borderRadius: 2, background: isDarkMode ? "#1e1e1e" : "#fff", px: { xs: 1, sm: 2 }, py: 1 },
        }}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{ py: 1 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{product.name}</Typography>
            <IconButton onClick={onCancel} sx={{ mr: -1.5 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider sx={{ mx: 2 }}>Options</Divider>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {variantCount && variantCount && (
            <>
              {product.variants?.map((variant, index) => {
                return (
                  <Stack
                    key={index}
                    mx={1}
                    sx={{
                      cursor: "pointer",
                      borderRadius: 2,
                      border: `solid 1px ${
                        selectedVariant === index ? theme.palette.primary.main : theme.palette.divider
                      }`,
                    }}
                    p={2}
                    onClick={() => setSelectedVariant(index)}
                  >
                    <Typography variant="body2">
                      {"$"}
                      {formatNumberWithoutCurrency(variant.price || 0)}
                    </Typography>
                    <Typography variant="caption" textAlign="center">
                      {variant.name}
                    </Typography>
                  </Stack>
                );
              })}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            fullWidth
            size="large"
            endIcon={<AddShoppingCartOutlinedIcon sx={{ color: theme.palette.info.main }} />}
            onClick={onCancel}
            sx={{ mx: { xs: 2, sm: 4, md: 6 }, borderRadius: 4 }}
            color="info"
          >
            Add to Cart
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductWithVariantDialog;
