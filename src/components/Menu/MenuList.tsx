import { Box, Grid } from "@mui/material";
import React, { useMemo } from "react";
import { COLLECTIONS } from "../../constants/collections";
import { useFetchItems } from "../../firebase/hooks/useFetchItemsHook";
import CategoryIcons from "../../media/CategoryIcons";
import { CategoryModel } from "../../models/CategoryModel";
import { ProductModel } from "../../models/ProductModel";
import { getCategoryDetailsById } from "../../utils/utils";
import ReusableFallbackLoading from "../ReusableComponents/ReusableFallbackLoading";
import MenuListItem from "./MenuListItem";
interface Props {
  selectedCategory: CategoryModel | null;
  searchFilter: string;
}

const MenuList = ({ selectedCategory, searchFilter }: Props) => {
  const { items: products, loading: loadingProducts } = useFetchItems<ProductModel>(COLLECTIONS.Products);
  const { items: categories, loading: loadingCategories } = useFetchItems<CategoryModel>(COLLECTIONS.Categories);

  const filteredProducts = useMemo(() => {
    const filteredProducts = products?.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchFilter.toLowerCase());
      const matchesCategory = !selectedCategory || selectedCategory?.id.includes(product.category_id);
      return matchesSearch && matchesCategory;
    });

    return filteredProducts;
  }, [products, selectedCategory, searchFilter]);

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
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default React.memo(MenuList);
