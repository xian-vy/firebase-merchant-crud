import { Grid, useTheme } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { COLLECTIONS } from "../../constants/collections";
import useDeleteItemHook from "../../firebase/hooks/useDeleteItemHook";
import { useFetchItems } from "../../firebase/hooks/useFetchItemsHook";
import CategoryIcons from "../../media/CategoryIcons";
import { CategoryModel } from "../../models/CategoryModel";
import { ProductModel } from "../../models/ProductModel";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";
import useSnackbarHook from "../hooks/useSnackBarHook";
import ProductForm from "./ProductForm";
import ProductListItem from "./ProductListItem";
interface Props {
  selectedCategory: CategoryModel | null;
  searchFilter: string;
}

const ProductsList = ({ selectedCategory, searchFilter }: Props) => {
  const { openSuccessSnackbar, SnackbarComponent } = useSnackbarHook();

  const [editMode, setEditMode] = useState(false);
  const [localProducts, setLocalProducts] = useState<ProductModel[] | null>(null);
  const [localCategories, setLocalCategories] = useState<CategoryModel[] | null>(null);

  const [editProduct, setEditProduct] = useState({
    open: false,
    product: {} as ProductModel,
  });

  const [deleteProduct, setDeleteProduct] = useState({
    open: false,
    product: {} as ProductModel,
  });

  const { items: products, loading } = useFetchItems<ProductModel>(COLLECTIONS.Products);
  const { items: categories, loading: loadingCategories } = useFetchItems<CategoryModel>(COLLECTIONS.Categories);
  const { error: deleteError, deleteDocument } = useDeleteItemHook(COLLECTIONS.Products);

  useEffect(() => {
    if (!loading) {
      setLocalProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (!loadingCategories) {
      setLocalCategories(categories);
    }
  }, [categories]);

  const getCategoryDetailsById = (categoryId: string) => {
    const category = localCategories?.find((category) => category.id === categoryId);
    return category;
  };

  const handleAction = (action: string, product: ProductModel) => {
    if (action === "Edit") {
      setEditMode(true);
      setEditProduct({ open: true, product: product });
    } else {
      setDeleteProduct({ open: true, product: product });
    }
  };

  const handleDelete = () => {
    deleteDocument(deleteProduct.product.id || "");
    if (!deleteError) {
      openSuccessSnackbar("Product has been Deleted!");
      setDeleteProduct({ open: false, product: {} as ProductModel });
    } else {
      console.error("Delete product error", deleteError);
      openSuccessSnackbar("Something went wrong. Please Try Again", true);
    }
  };

  const filteredProducts = useMemo(() => {
    return localProducts?.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchFilter.toLowerCase());
      const matchesCategory = !selectedCategory || selectedCategory?.id.includes(product.category_id);
      return matchesSearch && matchesCategory;
    });
  }, [localProducts, selectedCategory, searchFilter]);

  return (
    <div>
      <Grid container spacing={{ xs: 1, md: 2 }} padding={3}>
        {filteredProducts?.map((product, index) => {
          const productCategory = getCategoryDetailsById(product.category_id);
          const categoryIcon = CategoryIcons.find((icon) => icon.name === productCategory?.icon);

          return (
            <Grid item key={index} xs={12} sm={6} md={4} xl={3}>
              <ProductListItem
                product={product}
                productCategory={{ color: productCategory?.color || "", icon: categoryIcon }}
                onActionSelect={handleAction}
              />
            </Grid>
          );
        })}
      </Grid>

      <ProductForm
        newProduct={editProduct.product}
        onCancel={() => setEditProduct({ open: false, product: {} as ProductModel })}
        isEditMode={editMode}
        selectedCategory={selectedCategory}
        open={editProduct.open || false}
      />

      <DeleteConfirmationDialog
        open={deleteProduct.open || false}
        onCancel={() => setDeleteProduct({ open: false, product: {} as ProductModel })}
        onConfirm={handleDelete}
      />
      {SnackbarComponent}
    </div>
  );
};

export default ProductsList;
