import { Stack } from "@mui/material";
import React, { useState } from "react";
import { CategoryModel } from "../../models/CategoryModel";
import CategoryList from "../Category/CategoryList";
import ProductForm from "./ProductForm";
import ProductListHeader from "./ProductListHeader";
import ProductsList from "./ProductsList";

const ProductsMain = () => {
  const [addProduct, setAddProduct] = useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const [category, setNewCategory] = useState<CategoryModel | null>(null);

  const handleCategoryChange = (category: CategoryModel | null) => {
    setNewCategory(category);
  };

  const handleAddNewProduct = () => {
    setAddProduct(true);
  };

  const handleSearch = (searchString: string) => {
    setSearchValue(searchString);
  };

  return (
    <Stack sx={{ py: 2 }}>
      <CategoryList onCategorySelect={handleCategoryChange} selectedCategory={category} />

      <ProductListHeader onAddNewProduct={handleAddNewProduct} onSearch={handleSearch} />

      <ProductsList selectedCategory={category} searchFilter={searchValue} />

      <ProductForm
        onCancel={() => setAddProduct(false)}
        isEditMode={false}
        selectedCategory={category}
        open={addProduct}
      />
    </Stack>
  );
};

export default ProductsMain;
