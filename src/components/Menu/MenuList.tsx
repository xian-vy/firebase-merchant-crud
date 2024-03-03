import { Box, Grid } from "@mui/material";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import CategoryIcons from "../../media/CategoryIcons";
import { CategoryModel } from "../../models/CategoryModel";
import { RootState } from "../../redux/store";
import { getCategoryDetailsById } from "../../utils/utils";
import ReusableFallbackLoading from "../ReusableComponents/ReusableFallbackLoading";
import MenuListItem from "./MenuListItem";
import useSnackbarHook from "../hooks/useSnackBarHook";
interface Props {
  selectedCategory: CategoryModel | null;
  searchFilter: string;
}

const MenuList = ({ selectedCategory, searchFilter }: Props) => {
  const { openSuccessSnackbar, SnackbarComponent } = useSnackbarHook();
  const products = useSelector((state: RootState) => state.productsSlice.products);
  const categories = useSelector((state: RootState) => state.categorySlice.categories);

  const filteredProducts = useMemo(() => {
    if (!products) {
      return [];
    }
    const filteredProducts = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchFilter.toLowerCase());
      const matchesCategory = !selectedCategory || selectedCategory?.id.includes(product.category_id);
      return matchesSearch && matchesCategory;
    });

    return filteredProducts;
  }, [products, selectedCategory, searchFilter]);

  const handleAddtoCart = (unavailable: boolean | undefined) => {
    if (unavailable) {
      openSuccessSnackbar("Item is currently unavailable", true);
    } else {
      openSuccessSnackbar("Item Added to Cart!");
    }
  };
  return (
    <>
      <Box p={2} display="flex" justifyContent="center" minHeight={500}>
        {!filteredProducts ? (
          <ReusableFallbackLoading />
        ) : (
          <Grid container spacing={2}>
            {filteredProducts.map((product) => {
              const productCategory = getCategoryDetailsById(product.category_id, categories);
              const categoryIcon = CategoryIcons.find((icon) => icon.name === productCategory?.icon);

              return (
                <Grid xs={12} sm={6} md={4} lg={3} xl={2} item key={product.id}>
                  <MenuListItem
                    product={product}
                    key={product.id}
                    productCategory={{ color: productCategory?.color || "", icon: categoryIcon }}
                    addToCart={handleAddtoCart}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
      {SnackbarComponent}
    </>
  );
};

export default React.memo(MenuList);
