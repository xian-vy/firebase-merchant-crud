import { Paper, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import "swiper/css";
import "./swiper.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { COLLECTIONS } from "../../constants/collections";
import { CATEGORY_ITEM_STYLE, ICON_MD } from "../../constants/sizes";
import { useFetchItems } from "../../firebase/hooks/useFetchItemsHook";
import CategoryIcons from "../../media/CategoryIcons";
import { CategoryModel } from "../../models/CategoryModel";
import useLoadingHook from "../hooks/useLoadingHook";
import CategoryForm from "./CategoryForm";

const swiperSlideStyle = { display: "inline-block", width: "auto" };

const typographyStyle = {
  fontSize: { xs: "0.7rem", sm: "0.9rem" },
};

function renderIcon(icon: React.ReactElement, color: string) {
  return React.cloneElement(icon, { style: { color: color, fontSize: ICON_MD } });
}

interface Props {
  onCategorySelect: (category: CategoryModel | null) => void;
  selectedCategory: CategoryModel | null;
}
const CategoryList = ({ onCategorySelect, selectedCategory }: Props) => {
  const theme = useTheme();
  const xS = useMediaQuery(theme.breakpoints.down("sm"));
  const [editCategory, setEditCategory] = useState({
    open: false,
    category: null,
  });

  const { items: categories, loading, error } = useFetchItems<CategoryModel>(COLLECTIONS.Categories);
  const { LoadingIndicator } = useLoadingHook(loading);

  const handleAddNewCategory = () => {
    setEditCategory({ open: true, category: null });
  };

  return (
    <div style={{ width: "100%" }}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Stack sx={{ p: 2, width: "100%" }}>
          <Swiper
            spaceBetween={5}
            slidesPerView="auto"
            centeredSlides={false}
            breakpoints={{
              640: {
                spaceBetween: 10,
              },
              1024: {
                spaceBetween: 15,
              },
            }}
          >
            {/* "New" button as slide item */}
            <SwiperSlide key="new" style={swiperSlideStyle}>
              <Paper
                sx={{
                  ...CATEGORY_ITEM_STYLE,
                  height: { xs: 32, sm: "auto" },
                  ":hover": {
                    border: `solid 1px ${theme.palette.success.main}`,
                    color: "#fff",
                  },
                }}
                variant="outlined"
                onClick={handleAddNewCategory}
              >
                <Typography sx={{ ...typographyStyle }}>New</Typography>
              </Paper>
            </SwiperSlide>
            {/* "All" button as slide item */}
            <SwiperSlide key="all" style={swiperSlideStyle}>
              <Paper
                sx={{
                  ...CATEGORY_ITEM_STYLE,
                  height: { xs: 32, sm: "auto" },
                  border: `solid 1px ${!selectedCategory ? theme.palette.primary.main : "inherit"}`,
                }}
                variant="outlined"
                onClick={() => onCategorySelect(null)}
              >
                <Typography sx={{ ...typographyStyle }}>All</Typography>
              </Paper>
            </SwiperSlide>
            {categories &&
              categories.map((category) => {
                const categoryIcon = CategoryIcons.find((icon) => icon.name === category.icon);
                const name = category.name;
                return (
                  <SwiperSlide key={category.id} style={swiperSlideStyle}>
                    <Paper
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
                      <Typography ml={0.5} sx={{ ...typographyStyle }}>
                        {xS ? name.substring(0, 6) + ".." : name}
                      </Typography>
                    </Paper>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </Stack>
      )}

      <CategoryForm
        closeForm={() => setEditCategory({ open: false, category: null })}
        editCategory={editCategory && editCategory.category}
        isEditMode={false}
        open={editCategory.open}
      />
    </div>
  );
};

export default React.memo(CategoryList);
