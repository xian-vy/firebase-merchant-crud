import Masonry from "@mui/lab/Masonry";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { COLLECTIONS } from "../../constants/collections";
import useDeleteItemHook from "../../firebase/hooks/useDeleteItemHook";
import { useFetchItems } from "../../firebase/hooks/useFetchItemsHook";
import CategoryIcons from "../../media/CategoryIcons";
import { CategoryModel } from "../../models/CategoryModel";
import { ProductModel } from "../../models/ProductModel";
import { getCategoryDetailsById } from "../../utils/utils";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";
import ReusableFallbackLoading from "../ReusableComponents/ReusableFallbackLoading";
import useSnackbarHook from "../hooks/useSnackBarHook";
import { handleFavoriteClick } from "./Favorites";
import ProductListItem from "./ProductListItem";
import { ACTION_ADD_TO_STORE, ACTION_DELETE, ACTION_EDIT, ACTION_REMOVE_FROM_STORE } from "../../constants/actions";
import useUpdateItemHook from "../../firebase/hooks/useUpdateItemHook";
import ReusableBackdrop from "../ReusableComponents/ReusableBackdrop";
interface Props {
  selectedCategory: CategoryModel | null;
  searchFilter: string;
}

const ProductForm = React.lazy(() => import("./ProductForm"));

const ProductsList = ({ selectedCategory, searchFilter }: Props) => {
  const { openSuccessSnackbar, SnackbarComponent } = useSnackbarHook();
  const [editMode, setEditMode] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = React.useState(false);
  const [favorites, setFavorites] = React.useState<string[]>([]);

  const [editProduct, setEditProduct] = useState({
    open: false,
    product: {} as ProductModel,
  });

  const [deleteProduct, setDeleteProduct] = useState({
    open: false,
    product: {} as ProductModel,
  });

  const { items: products, loading: loadingProducts } = useFetchItems<ProductModel>(COLLECTIONS.Products);
  const { items: categories, loading: loadingCategories } = useFetchItems<CategoryModel>(COLLECTIONS.Categories);
  const { error: deleteError, deleteDocument } = useDeleteItemHook(COLLECTIONS.Products);
  const {
    error: updateError,
    updateDocument,
    loading: loadingUpdate,
  } = useUpdateItemHook<ProductModel>(COLLECTIONS.Products);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleAction = async (action: string, product: ProductModel) => {
    if (action === ACTION_EDIT) {
      setEditMode(true);
      setEditProduct({ open: true, product: product });
    } else if (action === ACTION_DELETE) {
      setDeleteProduct({ open: true, product: product });
    } else if (action === ACTION_ADD_TO_STORE || action === ACTION_REMOVE_FROM_STORE) {
      const updatedProduct = { ...product, unavailable: product.unavailable ? false : true };
      await updateDocument(updatedProduct);
      if (!updateError) {
        openSuccessSnackbar(`Item has been ${product.unavailable ? "added to store menu" : "removed from store menu"}`);
      } else {
        console.log("Update availability error", updateError);
      }
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

  const handleFavorite = (product: ProductModel) => {
    handleFavoriteClick(favorites, product, setFavoriteLoading, setFavorites, openSuccessSnackbar);
  };

  const filteredProducts = useMemo(() => {
    if (!products) {
      return [];
    }
    let filteredProducts = [...products];
    // search and category filters
    filteredProducts = filteredProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchFilter.toLowerCase());
      const matchesCategory = !selectedCategory || selectedCategory?.id.includes(product.category_id);
      return matchesSearch && matchesCategory;
    });
    return filteredProducts;
  }, [products, selectedCategory, searchFilter]);

  const sortedProducts = useMemo(() => {
    let sortedProducts = [...filteredProducts];
    if (favorites.length > 0) {
      //favorites comes first
      sortedProducts.sort((a, b) => {
        const aIsFavorite = favorites.includes(a.id || "");
        const bIsFavorite = favorites.includes(b.id || "");
        if (aIsFavorite && !bIsFavorite) return -1;
        if (!aIsFavorite && bIsFavorite) return 1;
        return 0;
      });
    }
    return sortedProducts;
  }, [favorites, filteredProducts]);

  return (
    <>
      <Backdrop
        open={favoriteLoading || loadingUpdate}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box p={2} display="flex" justifyContent="center" minHeight={500}>
        {!sortedProducts ? (
          <ReusableFallbackLoading />
        ) : (
          <Masonry columns={{ xs: 1, sm: 2, lg: 3, xl: 4 }} spacing={2} sequential>
            {sortedProducts.map((product) => {
              const productCategory = getCategoryDetailsById(product.category_id, categories);
              const categoryIcon = CategoryIcons.find((icon) => icon.name === productCategory?.icon);
              const isFavorite = !!favorites.find((fav) => product.id === fav);

              return (
                <ProductListItem
                  product={product}
                  productCategory={{ color: productCategory?.color || "", icon: categoryIcon }}
                  onActionSelect={handleAction}
                  key={product.id}
                  onFavoriteClick={handleFavorite}
                  isFavorite={isFavorite}
                />
              );
            })}
          </Masonry>
        )}
      </Box>
      {editProduct.open && (
        <React.Suspense fallback={<ReusableBackdrop open={editProduct.open} />}>
          <ProductForm
            newProduct={editProduct.product}
            onCancel={() => setEditProduct({ open: false, product: {} as ProductModel })}
            isEditMode={editMode}
            selectedCategory={selectedCategory}
            open={editProduct.open || false}
          />
        </React.Suspense>
      )}

      <DeleteConfirmationDialog
        open={deleteProduct.open || false}
        onCancel={() => setDeleteProduct({ open: false, product: {} as ProductModel })}
        onConfirm={handleDelete}
        itemDescription={deleteProduct.product.name}
      />
      {SnackbarComponent}
    </>
  );
};

export default React.memo(ProductsList);
