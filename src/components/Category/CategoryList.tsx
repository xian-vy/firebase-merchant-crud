import { Paper, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { COLLECTIONS } from "../../constants/collections";
import { CATEGORY_ITEM_STYLE, ICON_MD } from "../../constants/sizes";
import { useFetchItems } from "../../firebase/hooks/useFetchItemsHook";
import CategoryIcons from "../../media/CategoryIcons";
import { CategoryModel } from "../../models/CategoryModel";
import ReusableFallbackLoading from "../ReusableComponents/ReusableFallbackLoading";

function renderIcon(icon: React.ReactElement, color: string) {
  return React.cloneElement(icon, { style: { color: color, fontSize: ICON_MD } });
}

interface Props {
  onCategorySelect: (category: CategoryModel | null) => void;
  selectedCategory: CategoryModel | null;
  editMode: boolean;
  resetModeAndUpdateCategory: (category: CategoryModel | null) => void;
}

const CategoryForm = React.lazy(() => import("./CategoryForm"));

const CategoryList = ({ onCategorySelect, selectedCategory, editMode, resetModeAndUpdateCategory }: Props) => {
  const theme = useTheme();
  const { items: categories, loading, error } = useFetchItems<CategoryModel>(COLLECTIONS.Categories);
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
      {loading ? (
        <ReusableFallbackLoading />
      ) : (
        <Stack direction="row" justifyContent="center" flexWrap="wrap" padding={1}>
          {/* "New" button as slide item */}

          <Paper
            sx={{
              ...CATEGORY_ITEM_STYLE,
              height: { xs: 32, sm: "auto" },
              ":hover": {
                border: `solid 1px ${theme.palette.success.main}`,
              },
            }}
            variant="outlined"
            onClick={handleAddNewCategory}
          >
            <Typography>New</Typography>
          </Paper>

          {/* "All" button as slide item */}

          <Paper
            sx={{
              ...CATEGORY_ITEM_STYLE,
              height: { xs: 32, sm: "auto" },
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
              return (
                <Paper
                  key={category.id}
                  sx={{
                    ...CATEGORY_ITEM_STYLE,
                    height: { xs: 32, sm: "auto" },
                    border: `solid 1px ${selectedCategory === category ? category.color : "inherit"}`,
                  }}
                  variant="outlined"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCategorySelect(category);
                  }}
                >
                  {categoryIcon && renderIcon(categoryIcon.icon, category.color)}
                  <Typography ml={0.5} sx={{ userSelect: "none" }}>
                    {name}
                  </Typography>
                </Paper>
              );
            })}
        </Stack>
      )}

      <React.Suspense fallback={<ReusableFallbackLoading />}>
        <CategoryForm
          closeForm={handleReset}
          editCategory={editCategory.category}
          isEditMode={editMode || false}
          open={editCategory.open}
        />
      </React.Suspense>
    </div>
  );
};

export default React.memo(CategoryList);
