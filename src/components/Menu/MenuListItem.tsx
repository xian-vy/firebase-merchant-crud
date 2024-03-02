import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Checkbox, Divider, IconButton, Paper, Stack, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React from "react";
import { ICON_LG, ICON_SM } from "../../constants/sizes";
import { ProductModel } from "../../models/ProductModel";
import { formatNumberWithoutCurrency } from "../../utils/utils";
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
}

export default function MenuListItem({ product, productCategory }: Props) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  return (
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
      <Stack sx={{ px: 2, height: 10 }}>
        {product.unavailable && (
          <Divider>
            <Typography sx={{ color: "salmon" }}>Unavailable</Typography>
          </Divider>
        )}
      </Stack>
      <CardContent sx={{ py: 1 }}>
        <Typography gutterBottom textAlign="center">
          {product.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div" textAlign="center">
          {"$" + formatNumberWithoutCurrency(product.price || 0)}
        </Typography>
      </CardContent>

      <CardActions disableSpacing sx={{ pb: 1, display: "flex", justifyContent: "space-between" }}>
        <Checkbox
          icon={<FavoriteBorder style={{ color: isDarkMode ? "#666" : "#999" }} />}
          checkedIcon={<Favorite style={{ color: isDarkMode ? "#666" : "#FF69B4" }} />}
          checked={false}
          // onPointerDown={(e) => {
          //   e.stopPropagation();
          //   onFavoriteClick(product);
          // }}
        />
        <IconButton disabled={product.unavailable}>
          <AddShoppingCartOutlinedIcon sx={{ fontSize: ICON_SM, cursor: "pointer" }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
