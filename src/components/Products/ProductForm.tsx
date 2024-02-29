import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  Divider,
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
import { isValidInput } from "../../utils/utils";
import ReusableCategorySelection from "../ReusableComponents/ReusableCategorySelection";
import ReusableFormActionButton from "../ReusableComponents/ReusableFormActionButton";
import useSnackbarHook from "../hooks/useSnackBarHook";

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
  }, [isEditMode, newProduct, categories, categoryLoading]);

  const handleFormSubmit = useCallback(async () => {
    const finalProduct = {
      ...localProduct,
      ...(withVariant ? { variants: productVariants } : { variants: [] }),
    };
    if (isEditMode) {
      await updateDocument(finalProduct);
      if (!updateError) {
        openSuccessSnackbar("Product has been Updated!");
      } else {
        console.error("Update product error", updateError);
        openSuccessSnackbar("Something went wrong.Please Try Again", true);
      }
    } else {
      await insertDocument(finalProduct);
      if (!createError) {
        openSuccessSnackbar("New Product has been Added!");
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

  const handleVariantChange = <T extends keyof ProductVariantsModel>(
    index: number,
    field: T,
    value: ProductVariantsModel[T]
  ) => {
    const newVariants = [...productVariants];
    newVariants[index][field] = value;
    setProductVariants(newVariants);
  };
  const addVariant = () => {
    setProductVariants([...productVariants, { name: "", price: 0, cost: 0 }]);
  };

  const removeVariant = (index: number) => {
    const newVariants = [...productVariants];
    newVariants.splice(index, 1);
    setProductVariants(newVariants);
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
            spacing={1.5}
            padding={{ xs: 0.5, sm: 1.5 }}
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit();
            }}
          >
            {/* Product Item Name */}
            <TextField
              label="Product Item Name"
              variant="outlined"
              size="small"
              autoFocus
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

            {/* Stock QTY and Category */}
            <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
              <ReusableCategorySelection
                label="Category"
                categories={categories || []}
                icons={CategoryIcons}
                category_id={localProduct.category_id || ""}
                onChange={handleCategoryChange}
              />

              <TextField
                label="Stock QTY"
                variant="outlined"
                size="small"
                required
                fullWidth
                inputMode="numeric"
                inputProps={{ inputMode: "numeric" }}
                value={localProduct.stock || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (isValidInput(value) && value.length <= 8) {
                    setLocalProduct({
                      ...localProduct,
                      stock: parseFloat(value) || 0,
                    });
                  }
                }}
              />
            </Stack>

            {/*  Price and Cost*/}
            {!withVariant && (
              <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                <TextField
                  label="Price"
                  variant="outlined"
                  size="small"
                  required
                  fullWidth
                  inputMode="numeric"
                  inputProps={{ inputMode: "numeric" }}
                  value={localProduct.price || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (isValidInput(value) && value.length <= 8) {
                      setLocalProduct({
                        ...localProduct,
                        price: parseFloat(value) || 0,
                      });
                    }
                  }}
                />
                <TextField
                  label="Cost"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  inputMode="numeric"
                  inputProps={{ inputMode: "numeric" }}
                  value={localProduct.cost || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (isValidInput(value) && value.length <= 8) {
                      setLocalProduct({
                        ...localProduct,
                        cost: parseFloat(value) || 0,
                      });
                    }
                  }}
                />
              </Stack>
            )}

            {/*  Variant Checkbox */}

            <Stack direction="row" alignItems="center">
              <Checkbox
                checked={withVariant}
                onClick={(e) => {
                  setWithVariant(!withVariant);
                }}
                sx={{ height: 20 }}
              />
              <Typography variant="caption">Add Variant (eg. Small, Large, Slice)</Typography>
            </Stack>

            {withVariant && (
              <Stack direction="column" spacing={1}>
                <Divider>Variants</Divider>
                {productVariants.map((variant, index) => (
                  <React.Fragment key={index}>
                    <Stack direction="row" spacing={1}>
                      <TextField
                        label="Variant"
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        required
                        fullWidth
                        value={variant.name}
                        onChange={(e) => handleVariantChange(index, "name", e.target.value)}
                      />

                      <TextField
                        label="Price"
                        variant="outlined"
                        size="small"
                        required
                        fullWidth
                        inputMode="numeric"
                        inputProps={{ inputMode: "numeric" }}
                        value={variant.price}
                        onChange={(e) => handleVariantChange(index, "price", parseFloat(e.target.value) || 0)}
                      />
                      <TextField
                        label="Cost"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        inputMode="numeric"
                        inputProps={{ inputMode: "numeric" }}
                        value={variant.cost}
                        onChange={(e) => handleVariantChange(index, "cost", parseFloat(e.target.value) || 0)}
                      />
                      <IconButton onClick={() => removeVariant(index)}>
                        <ClearIcon />
                      </IconButton>
                    </Stack>
                  </React.Fragment>
                ))}
                <Button onClick={addVariant}>Add Variant</Button>
              </Stack>
            )}

            {/*  Cancel and Create/Update Button */}
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
