import ClearIcon from "@mui/icons-material/Clear";
import {
  Checkbox,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { COLLECTIONS } from "../../constants/collections";
import useCreateItemHook from "../../firebase/hooks/useCreateItemHook";
import { useFetchItems } from "../../firebase/hooks/useFetchItemsHook";
import useUpdateItemHook from "../../firebase/hooks/useUpdateItemHook";
import CategoryIcons from "../../media/CategoryIcons";
import { CategoryModel } from "../../models/CategoryModel";
import { ProductModel, ProductVariantsModel } from "../../models/ProductModel";
import ReusableCategorySelection from "../ReusableComponents/ReusableCategorySelection";
import ReusableFormActionButton from "../ReusableComponents/ReusableFormActionButton";
import ReusableNumericTextfield from "../ReusableComponents/ReusableNumericTextfield";
import useSnackbarHook from "../hooks/useSnackBarHook";
import ProductFormWithVariant from "./ProductFormWithVariant";

interface Props {
  newProduct?: ProductModel;
  onCancel: () => void;
  isEditMode: boolean;
  selectedCategory: CategoryModel | null;
  open: boolean;
}

const ProductForm = ({ newProduct, onCancel, isEditMode, selectedCategory, open }: Props) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const { openSuccessSnackbar, SnackbarComponent } = useSnackbarHook();
  const [withVariant, setWithVariant] = useState(false);
  const [productVariants, setProductVariants] = useState<ProductVariantsModel[]>([]);

  const {
    loading: createLoading,
    error: createError,
    insertDocument,
  } = useCreateItemHook<ProductModel>(COLLECTIONS.Products);
  const {
    loading: updateLoading,
    error: updateError,
    updateDocument,
  } = useUpdateItemHook<ProductModel>(COLLECTIONS.Products);
  const {
    items: categories,
    loading: categoryLoading,
    error: categoryError,
  } = useFetchItems<CategoryModel>(COLLECTIONS.Categories);

  const [localProduct, setLocalProduct] = useState<ProductModel>({} as ProductModel);

  useEffect(() => {
    if (isEditMode) {
      if (newProduct) {
        setLocalProduct(newProduct);
        setProductVariants(newProduct.variants || []);
        setWithVariant((newProduct.variants?.length ?? 0) > 0);
      }
    } else {
      if (!categoryLoading && categories) {
        setLocalProduct((prevProduct) => ({
          ...prevProduct,
          category_id: selectedCategory
            ? categories.find((cat) => cat.id === selectedCategory.id)?.id || ""
            : categories[0].id,
        }));
      }
    }
  }, [isEditMode, newProduct, categories, categoryLoading, selectedCategory]);

  const handleFormSubmit = useCallback(async () => {
    if (withVariant && productVariants.length === 0 && localProduct.price === 0 && localProduct.cost === 0) {
      openSuccessSnackbar("Please enter the Price and Cost", true);
      return;
    }
    const finalProduct = {
      ...localProduct,
      ...(withVariant ? { variants: productVariants } : { variants: [] }),
    };
    if (isEditMode) {
      await updateDocument(finalProduct);
      if (!updateError) {
        setWithVariant(false);
        onCancel();
        openSuccessSnackbar("Product has been Updated!");
      } else {
        console.error("Update product error", updateError);
        openSuccessSnackbar("Something went wrong.Please Try Again", true);
      }
    } else {
      await insertDocument(finalProduct);
      if (!createError) {
        setLocalProduct({
          ...localProduct,
          name: "",
          stock: 0,
          price: 0,
          cost: 0,
          variants: [],
        });
        setProductVariants([]);
        setWithVariant(false);
        openSuccessSnackbar("New Product has been Added!");
      } else {
        console.error("Add product error", createError);
        openSuccessSnackbar("Something went wrong.Please Try Again", true);
      }
    }
  }, [isEditMode, localProduct, productVariants]);

  const handleCategoryChange = (category_id: string) => {
    setLocalProduct((prevProduct) => ({
      ...prevProduct,
      category_id,
    }));
  };

  const addVariant = () => {
    setProductVariants([...productVariants, { name: "", price: 0, cost: 0 }]);
  };

  const handleWithVariantChange = () => {
    if (!withVariant && productVariants.length === 0) {
      addVariant();
    }
    setWithVariant(!withVariant);
  };
  return (
    <div>
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 3, background: isDarkMode ? "#1e1e1e" : "#fff" },
        }}
      >
        <DialogContent>
          <Stack
            component="form"
            spacing={{ xs: 1.5, md: 2 }}
            px={{ xs: 0, sm: 1.5 }}
            py={0}
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit();
            }}
          >
            {/* Product Item Name  -----------------------------------------------------------*/}
            <TextField
              label="Product Item Name"
              variant="outlined"
              size="small"
              required
              fullWidth
              value={localProduct.name || ""}
              onChange={(e) => setLocalProduct({ ...localProduct, name: e.target.value })}
              InputProps={{
                endAdornment: localProduct.name && (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setLocalProduct({ ...localProduct, name: "" })} size="small">
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Stock QTY and Category -----------------------------------------------------------*/}
            <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
              <ReusableCategorySelection
                label="Category"
                categories={categories || []}
                icons={CategoryIcons}
                category_id={localProduct.category_id || ""}
                onChange={handleCategoryChange}
              />

              <ReusableNumericTextfield
                label="Stock QTY"
                value={localProduct.stock || ""}
                onValueChange={(value) =>
                  setLocalProduct((prevProduct) => ({
                    ...prevProduct,
                    stock: value,
                  }))
                }
              />
            </Stack>

            {/*  Price and Cost for Regular ---------------------------------------------*/}
            {!withVariant && (
              <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                <ReusableNumericTextfield
                  label="Price"
                  value={localProduct.price || ""}
                  onValueChange={(value) =>
                    setLocalProduct((prevProduct) => ({
                      ...prevProduct,
                      price: value,
                    }))
                  }
                />

                <ReusableNumericTextfield
                  label="Cost"
                  value={localProduct.cost || ""}
                  onValueChange={(value) =>
                    setLocalProduct((prevProduct) => ({
                      ...prevProduct,
                      cost: value,
                    }))
                  }
                />
              </Stack>
            )}

            {/*  Variant Checkbox -------------------------------------------------------------*/}

            <Stack direction="row" alignItems="center" style={{ marginTop: "5px", marginBottom: "0" }}>
              <Checkbox
                checked={withVariant}
                onClick={(e) => {
                  handleWithVariantChange();
                }}
              />
              <Typography variant="caption">Add Variant (Small,Large)</Typography>
            </Stack>

            {/*  Price and Cost for with Variant ------------------------------------------------*/}
            {withVariant && (
              <ProductFormWithVariant productVariants={productVariants} setProductVariants={setProductVariants} />
            )}

            {/*  Cancel and Create/Update Button  ----------------------------------------------*/}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <ReusableFormActionButton type="Cancel" disabled={false} onCancel={onCancel} order={2} />
              <ReusableFormActionButton
                type={isEditMode ? "Update" : "Create"}
                isLoading={createLoading || updateLoading}
                disabled={false}
                isEditMode={isEditMode}
                order={1}
              />
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
      {SnackbarComponent}
    </div>
  );
};

export default ProductForm;
