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

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

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

  const handleFavorite = (product: ProductModel) => {
    handleFavoriteClick(favorites, product, setFavoriteLoading, setFavorites, openSuccessSnackbar);
  };

  const filteredAndSortedProducts = useMemo(() => {
    // Sort products so that favorites come first
    let sortedProducts = products?.sort((a, b) => {
      const aIsFavorite = favorites.includes(a.id || "");
      const bIsFavorite = favorites.includes(b.id || "");
      if (aIsFavorite && !bIsFavorite) return -1;
      if (!aIsFavorite && bIsFavorite) return 1;
      return 0;
    });
    // apply search and category filters to the sorted list
    if (sortedProducts) {
      sortedProducts = sortedProducts.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchFilter.toLowerCase());
        const matchesCategory = !selectedCategory || selectedCategory?.id.includes(product.category_id);
        return matchesSearch && matchesCategory;
      });
    }
    return sortedProducts;
  }, [products, selectedCategory, searchFilter, favorites]);

  return (
    <>
      <Backdrop open={favoriteLoading} sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box p={2} display="flex" justifyContent="center" minHeight={500}>
        {!filteredAndSortedProducts ? (
          <ReusableFallbackLoading />
        ) : (
          <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={2} sequential>
            {filteredAndSortedProducts.map((product, index) => {
              const productCategory = getCategoryDetailsById(product.category_id, categories);
              const categoryIcon = CategoryIcons.find((icon) => icon.name === productCategory?.icon);
              const isFavorite = !!favorites.find((fav) => product.id === fav);
              return (
                <ProductListItem
                  product={product}
                  productCategory={{ color: productCategory?.color || "", icon: categoryIcon }}
                  onActionSelect={handleAction}
                  key={index}
                  onFavoriteClick={handleFavorite}
                  isFavorite={isFavorite}
                />
              );
            })}
          </Masonry>
        )}
      </Box>

      <React.Suspense fallback={<ReusableFallbackLoading />}>
        <ProductForm
          newProduct={editProduct.product}
          onCancel={() => setEditProduct({ open: false, product: {} as ProductModel })}
          isEditMode={editMode}
          selectedCategory={selectedCategory}
          open={editProduct.open || false}
        />
      </React.Suspense>

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
