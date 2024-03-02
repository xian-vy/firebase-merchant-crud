import React from "react";
import { CategoryModel } from "../../models/CategoryModel";
import { Stack, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { ICON_MD } from "../../constants/sizes";
import CategoryIcons from "../../media/CategoryIcons";

function renderIcon(icon: React.ReactElement, color: string) {
  return React.cloneElement(icon, { style: { color: color, fontSize: ICON_MD } });
}
interface Props {
  category: CategoryModel | null;
  onEditClick: () => void;
  isPrivate?: boolean;
}
const SelectedCategory = ({ category, onEditClick, isPrivate }: Props) => {
  const categoryIcon = CategoryIcons.find((icon) => icon.name === category?.icon);

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" mt={2}>
      {categoryIcon && renderIcon(categoryIcon.icon, category?.color || "")}
      <Typography variant="h6" ml={0.3}>
        {category ? category.name : "All Items"}
      </Typography>
      {category && isPrivate && (
        <EditOutlinedIcon fontSize="small" sx={{ ml: 1, cursor: "pointer" }} onClick={onEditClick} />
      )}
    </Stack>
  );
};

export default SelectedCategory;
