import { Paper, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CATEGORY_ITEM_STYLE, ICON_MD } from "../../constants/sizes";
import { getProductCountPerCategory } from "../../firebase/utils";
import CategoryIcons from "../../media/CategoryIcons";
import { CategoryModel } from "../../models/CategoryModel";
import { RootState } from "../../redux/store";
import ReusableFallbackLoading from "../ReusableComponents/ReusableFallbackLoading";
import CategoryForm from "./CategoryForm";
import { ThemeColor } from "../../utils/utils";

function renderIcon(icon: React.ReactElement, color: string) {
  return React.cloneElement(icon, { style: { color: color, fontSize: ICON_MD } });
}

interface Props {
  onCategorySelect: (category: CategoryModel | null) => void;
  selectedCategory: CategoryModel | null;
  editMode: boolean;
  resetModeAndUpdateCategory: (category: CategoryModel | null) => void;
  isPrivate?: boolean;
}

const CategoryList = ({
  onCategorySelect,
  selectedCategory,
  editMode,
  resetModeAndUpdateCategory,
  isPrivate,
}: Props) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const products = useSelector((state: RootState) => state.productsSlice.products);
  const categories = useSelector((state: RootState) => state.categorySlice.categories);

  const [editCategory, setEditCategory] = useState<{ open: boolean; category: CategoryModel | null }>({
    open: false,
    category: null,
  });

  const handleAddNewCategory = () => {
    setEditCategory({ open: true, category: null });
  };

  useEffect(() => {
    if (editMode) {
      setEditCategory({ open: true, category: selectedCategory });
    }
  }, [editMode]);

  const handleReset = (newCategory: CategoryModel | null) => {
    setEditCategory({ open: false, category: null });
    resetModeAndUpdateCategory(newCategory);
  };

  return (
    <div style={{ width: "100%" }}>
      {!categories || !products ? (
        <ReusableFallbackLoading />
      ) : (
        <Stack direction="row" justifyContent="center" flexWrap="wrap" padding={1}>
          {/* "New" button as slide item */}
          {isPrivate && (
            <Paper
              sx={{
                ...CATEGORY_ITEM_STYLE,
                ":hover": {
                  border: `solid 1px ${theme.palette.success.main}`,
                },
              }}
              variant="outlined"
              onClick={handleAddNewCategory}
            >
              <Typography>New</Typography>
            </Paper>
          )}
          {/* "All" button as slide item */}

          <Paper
            sx={{
              ...CATEGORY_ITEM_STYLE,
              border: `solid 1px ${!selectedCategory ? theme.palette.primary.main : "inherit"}`,
            }}
            variant="outlined"
            onClick={() => onCategorySelect(null)}
          >
            <Typography>All Items</Typography>
          </Paper>

          {categories &&
            categories.map((category) => {
              const categoryIcon = CategoryIcons.find((icon) => icon.name === category.icon);
              const name = category.name;
              const productPerCategory = getProductCountPerCategory(products, category);

              return (
                <Paper
                  key={category.id}
                  sx={{
                    ...CATEGORY_ITEM_STYLE,

                    border: `solid 1px ${selectedCategory === category ? category.color : "inherit"}`,
                  }}
                  variant="outlined"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCategorySelect(category);
                  }}
                >
                  {categoryIcon && renderIcon(categoryIcon.icon, category.color)}
                  <Stack direction="column" ml={0.5}>
                    <Typography sx={{ userSelect: "none", height: "1rem" }}>{name}</Typography>
                    <Typography sx={{ fontSize: "0.7rem", height: "0.9rem", color: ThemeColor(theme) }}>
                      {productPerCategory}
                      {" item"}
                    </Typography>
                  </Stack>
                </Paper>
              );
            })}
        </Stack>
      )}

      <CategoryForm
        closeForm={handleReset}
        editCategory={editCategory.category}
        isEditMode={editMode || false}
        open={editCategory.open}
      />
    </div>
  );
};

export default React.memo(CategoryList);
