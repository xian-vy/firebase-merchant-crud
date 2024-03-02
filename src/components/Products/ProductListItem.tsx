import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import { Checkbox, Divider, Grid, Stack, Tooltip, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useCallback } from "react";
import { COLLECTIONS } from "../../constants/collections";
import { ICON_SM, MAX_IMG_SIZE } from "../../constants/sizes";
import { storage } from "../../firebase";
import useUpdateItemHook from "../../firebase/hooks/useUpdateItemHook";
import { ProductModel } from "../../models/ProductModel";
import { formatNumberWithoutCurrency, useResponsiveCharLimit } from "../../utils/utils";
import { useMoreActionHook } from "../hooks/useMoreActionHook";
import useSnackbarHook from "../hooks/useSnackBarHook";
import { ACTION_ADD_TO_STORE, ACTION_DELETE, ACTION_EDIT, ACTION_REMOVE_FROM_STORE } from "../../constants/actions";
function renderIcon(iconType: IconType, color: string) {
  return React.cloneElement(iconType.icon, { style: { color: color, fontSize: ICON_SM } });
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
  onActionSelect: (action: string, productToEdit: ProductModel) => void;
  isFavorite: boolean;
  onFavoriteClick: (product: ProductModel) => void;
}

function ProductListItem({ product, productCategory, onActionSelect, isFavorite, onFavoriteClick }: Props) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const charLimit = useResponsiveCharLimit(theme);
  const variantCount = product.variants?.length;
  const { openSuccessSnackbar, SnackbarComponent } = useSnackbarHook();

  const handleAction = (action: string, productToEdit: ProductModel) => {
    onActionSelect(action, productToEdit);
    handleActionClose();
  };
  const { ActionPopover, handleActionOpen, handleActionClose } = useMoreActionHook({
    actions: [ACTION_EDIT, ACTION_DELETE, `${product.unavailable ? ACTION_ADD_TO_STORE : ACTION_REMOVE_FROM_STORE}`],
    handleAction,
  });

  const { error: updateError, updateDocument } = useUpdateItemHook<ProductModel>(COLLECTIONS.Products);

  const uploadImage = async (file: File) => {
    const storageRef = ref(storage, `images/merchant/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleUploadImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>, prod: ProductModel) => {
      const file = e.target.files?.[0];
      if (file) {
        if (file.size > MAX_IMG_SIZE * 1024) {
          openSuccessSnackbar("Upload Failed, Image should be less than 300kb", true);
          return;
        }
        const imgURL = await uploadImage(file);
        const updatedProduct = { ...prod, img: imgURL };
        await updateDocument(updatedProduct);
        if (!updateError) {
          console.log("Upload Successful");
        } else {
          console.log("Upload Failed");
        }
      }
    },
    [product, uploadImage, updateDocument, updateError]
  );

  return (
    <>
      <Card elevation={isDarkMode ? 2 : 0} sx={{ borderRadius: 3 }} variant={isDarkMode ? "elevation" : "outlined"}>
        {/* ---------------------Product Name,Category and Stock--------------------*/}
        <CardHeader
          avatar={
            <label htmlFor={`upload-input-${product.id}`} style={{ position: "relative", display: "inline-block" }}>
              <input
                id={`upload-input-${product.id}`}
                type="file"
                style={{
                  opacity: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
                onChange={(e) => handleUploadImage(e, product)}
              />
              {product.img ? (
                <img
                  src={product.img}
                  loading="lazy"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "15%",
                    objectFit: "cover",
                    objectPosition: "center",
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <Stack
                  sx={{
                    height: 50,
                    width: 50,
                    borderRadius: 2,
                    border: `dashed 1px ${isDarkMode ? "#333" : "#ccc"}`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <PhotoOutlinedIcon fontSize="small" />
                  <Typography sx={{ fontSize: "0.6rem" }}>Upload</Typography>
                </Stack>
              )}
            </label>
          }
          action={
            <IconButton aria-label="settings" onClick={(event) => handleActionOpen(event, product)}>
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Stack direction="row" alignItems="center" ml={-0.5}>
              {productCategory.icon && renderIcon(productCategory?.icon, productCategory?.color)}
              <Tooltip title={product.name} sx={{ cursor: "pointer" }}>
                <Typography align="left" ml={0.5}>
                  {product.name.length > charLimit ? product.name.substring(0, charLimit) + ".." : product.name}
                </Typography>
              </Tooltip>
            </Stack>
          }
          subheader={
            <Typography sx={{ fontSize: "0.8rem", mr: 0.5 }}>
              {"Stock "} {product.stock}{" "}
            </Typography>
          }
          sx={{ pt: 1, pb: 0.5 }}
        />
        <Divider sx={{ my: 1, mx: 2 }}>
          {product.unavailable && (
            <Typography variant="caption" sx={{ color: "salmon" }}>
              Unvailable
            </Typography>
          )}
        </Divider>
        <CardContent sx={{ py: 0 }}>
          {/* ---------------------Product With Variant Price/Cost---------------------*/}
          {variantCount && variantCount > 0 ? (
            <>
              {product.variants?.map((variant, index) => {
                return (
                  <Grid container justifyContent="center" key={index}>
                    <Grid item xs={4} container alignItems="center" flexDirection="column">
                      {index === 0 && <Typography>Variant</Typography>}
                      <Typography sx={{ fontSize: "0.75rem" }}>{variant.name}</Typography>
                    </Grid>
                    <Grid item xs={4} container alignItems="center" flexDirection="column">
                      {index === 0 && <Typography>Price</Typography>}
                      <Typography>{formatNumberWithoutCurrency(variant.price || 0)}</Typography>
                    </Grid>
                    <Grid item xs={4} container alignItems="center" flexDirection="column">
                      {index === 0 && <Typography>Cost</Typography>}
                      <Typography>{formatNumberWithoutCurrency(variant.cost || 0)}</Typography>
                    </Grid>
                  </Grid>
                );
              })}
            </>
          ) : (
            <>
              {/* ---------------------Regular Product Price/Cost---------------------*/}
              <Grid container justifyContent="center">
                <Grid item xs={6} container alignItems="center" flexDirection="column">
                  <Typography>Price</Typography>
                  <Typography>{formatNumberWithoutCurrency(product.price || 0)}</Typography>
                </Grid>
                <Grid item xs={6} container alignItems="center" flexDirection="column">
                  <Typography>Cost</Typography>
                  <Typography>{formatNumberWithoutCurrency(product.cost || 0)}</Typography>
                </Grid>
              </Grid>
            </>
          )}
        </CardContent>
        <CardActions disableSpacing sx={{ pb: 1, display: "flex", justifyContent: "flex-end" }}>
          <Checkbox
            icon={<FavoriteBorder style={{ color: isDarkMode ? "#666" : "#999" }} />}
            checkedIcon={<Favorite style={{ color: isDarkMode ? "#666" : "#FF69B4" }} />}
            sx={{ p: 0.5, mx: 1 }}
            checked={isFavorite}
            onPointerDown={(e) => {
              e.stopPropagation();
              onFavoriteClick(product);
            }}
          />
        </CardActions>

        {ActionPopover}
        {SnackbarComponent}
      </Card>
    </>
  );
}
export default React.memo(ProductListItem);
