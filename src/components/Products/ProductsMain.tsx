import { Paper, useTheme } from "@mui/material";
import React, { useState } from "react";
import { CategoryModel } from "../../models/CategoryModel";
import CategoryList from "../Category/CategoryList";
import SelectedCategory from "../Category/SelectedCategory";
import ProductForm from "./ProductForm";
import ProductListHeader from "./ProductListHeader";
import ProductsList from "./ProductsList";

const ProductsMain = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [addProduct, setAddProduct] = useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [editModeCategory, setEditModeCategory] = useState(false);
  const [category, setNewCategory] = useState<CategoryModel | null>(null);

  const handleCategoryChange = (category: CategoryModel | null) => {
    setEditModeCategory(false);
    setNewCategory(category);
  };

  const handleAddNewProduct = () => {
    setAddProduct(true);
  };

  const handleSearch = (searchString: string) => {
    setSearchValue(searchString);
  };

  const handleReset = (newCategory: CategoryModel | null) => {
    setEditModeCategory(false);
    setNewCategory(newCategory);
  };

  return (
    <Paper sx={{ py: 2, borderRadius: 3 }} variant={isDarkMode ? "elevation" : "outlined"}>
      <CategoryList
        onCategorySelect={handleCategoryChange}
        selectedCategory={category}
        editMode={editModeCategory}
        resetModeAndUpdateCategory={handleReset}
        isPrivate={true}
      />

      <ProductListHeader onAddNewProduct={handleAddNewProduct} onSearch={handleSearch} isPrivate={true} />

      <SelectedCategory category={category} onEditClick={() => setEditModeCategory(true)} isPrivate={true} />

      <ProductsList selectedCategory={category} searchFilter={searchValue} />

      <ProductForm
        onCancel={() => setAddProduct(false)}
        isEditMode={false}
        selectedCategory={category}
        open={addProduct}
      />
    </Paper>
  );
};

export default ProductsMain;
