import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Divider, Grid, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { ICON_MD } from "../../constants/sizes";
import { ProductModel } from "../../models/ProductModel";
import { formatNumberWithoutCurrency } from "../../utils/utils";
import { useMoreActionHook } from "../hooks/useMoreActionHook";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
function renderIcon(iconType: IconType, color: string) {
  return React.cloneElement(iconType.icon, { style: { color: color, fontSize: ICON_MD } });
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
}

function ProductListItem({ product, productCategory, onActionSelect }: Props) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAction = (action: string, productToEdit: ProductModel) => {
    onActionSelect(action, productToEdit);
    handleActionClose();
  };
  const { ActionPopover, handleActionOpen, handleActionClose } = useMoreActionHook({
    actions: ["Edit", "Delete"],
    handleAction,
  });

  const variantCount = product.variants?.length;
  return (
    <Card elevation={isDarkMode ? 2 : 0} sx={{ borderRadius: 3 }} variant={isDarkMode ? "elevation" : "outlined"}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "inherit", width: 26, height: 26 }} aria-label="icon">
            {productCategory.icon && renderIcon(productCategory?.icon, productCategory?.color)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={(event) => handleActionOpen(event, product)}>
            <MoreVertIcon />
          </IconButton>
        }
        title={product.name}
        subheader={
          <Typography sx={{ fontSize: "0.8rem", mr: 0.5 }}>
            {"Stock "} {product.stock}{" "}
          </Typography>
        }
        sx={{ py: 1 }}
      />
      <Divider sx={{ my: 1, mx: 2 }} />
      <CardContent sx={{ py: 0 }}>
        {/* ---------------------------------Product With Variant ------------------------------------*/}
        {variantCount ?? 0 > 0 ? (
          <>
            {product.variants?.map((variant, index) => {
              return (
                <Grid container justifyContent="center" key={index} mb={0.5}>
                  <Grid item xs={4} container alignItems="start" flexDirection="column">
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
            {/* ---------------------------------Regular Product ------------------------------------*/}
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
      <CardActions disableSpacing sx={{ py: 0 }}>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Divider>Other Details</Divider>
          <Typography paragraph></Typography>
        </CardContent>
      </Collapse>
      {ActionPopover}
    </Card>
  );
}
export default React.memo(ProductListItem);
