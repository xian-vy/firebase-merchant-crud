import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Checkbox, Divider, IconButton, Stack, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { ICON_SM } from "../../constants/sizes";
import { ProductModel } from "../../models/ProductModel";
import { formatNumberWithoutCurrency } from "../../utils/utils";
import ProductWithVariantDialog from "./ProductWithVariantDialog";
function renderIcon(iconType: IconType, color: string) {
  return React.cloneElement(iconType.icon, { style: { color: color, fontSize: "32px" } });
}

type IconType = {
  name: string;
  icon: React.ReactElement;
};
type ProductCategoryType = {
  color: string;
  icon: IconType | undefined;
};

interface Props {
  product: ProductModel;
  productCategory: ProductCategoryType;
  addToCart: (unavailable: boolean | undefined) => void;
}

export default function MenuListItem({ product, productCategory, addToCart }: Props) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const price = product.price ? product.price : product.variants ? product.variants[0].price : 0;

  const handleAddtoCart = () => {
    if (product.variants?.length === 0) {
      addToCart(product.unavailable);
    } else {
      setOpenDialog(true);
    }
  };
  return (
    <>
      <Card elevation={isDarkMode ? 2 : 0} sx={{ borderRadius: 2 }} variant={isDarkMode ? "elevation" : "outlined"}>
        {product.img ? (
          <CardMedia
            sx={{
              height: 140,
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              m: 2,
              borderRadius: 3,
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
            image={product.img}
            title={product.name}
          />
        ) : (
          <Stack sx={{ height: 140, m: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
            {productCategory.icon && renderIcon(productCategory?.icon, productCategory?.color)}
          </Stack>
        )}
        <Stack sx={{ px: 2, height: 10, mb: 1 }}>
          {product.unavailable && (
            <Divider>
              <Typography sx={{ color: "salmon" }}>Unavailable</Typography>
            </Divider>
          )}
        </Stack>
        <CardContent sx={{ pt: 1, pb: 0 }}>
          <Typography gutterBottom textAlign="center">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h6" component="div" textAlign="center">
            {"$" + formatNumberWithoutCurrency(price)}
          </Typography>
        </CardContent>

        <CardActions disableSpacing sx={{ pb: 1, display: "flex", justifyContent: "space-between" }}>
          <Checkbox
            icon={<FavoriteBorder style={{ color: isDarkMode ? "#666" : "#999" }} />}
            checkedIcon={<Favorite style={{ color: isDarkMode ? "#666" : "#FF69B4" }} />}
            checked={false}
          />
          <IconButton onClick={handleAddtoCart}>
            <AddShoppingCartOutlinedIcon sx={{ fontSize: ICON_SM, cursor: "pointer" }} />
          </IconButton>
        </CardActions>
      </Card>
      <ProductWithVariantDialog open={openDialog} product={product} onCancel={() => setOpenDialog(false)} />
    </>
  );
}
