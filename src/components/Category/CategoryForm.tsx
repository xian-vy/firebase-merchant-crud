import { Box, Dialog, DialogContent, Stack, TextField, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { CirclePicker } from "react-color";
import { COLLECTIONS } from "../../constants/collections";
import useCreateItemHook from "../../firebase/hooks/useCreateItemHook";
import useUpdateItemHook from "../../firebase/hooks/useUpdateItemHook";
import { getRandomColor } from "../../firebase/inititalCategories";
import CategoryIcons from "../../media/CategoryIcons";
import { CategoryModel } from "../../models/CategoryModel";
import ReusableFormActionButton from "../ReusableComponents/ReusableFormActionButton";
import ReusableIconSelection from "../ReusableComponents/ReusableIconSelection";
import useSnackbarHook from "../hooks/useSnackBarHook";

interface Props {
  closeForm: (category: CategoryModel | null) => void;
  editCategory: CategoryModel | null;
  isEditMode: boolean;
  open: boolean;
}

const CategoryForm: React.FC<Props> = ({ closeForm, editCategory, isEditMode, open }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const { openSuccessSnackbar, SnackbarComponent } = useSnackbarHook();
  const [duplicateDetected, setDuplicateDetected] = useState(false);
  const [color, setColor] = useState("#000000");

  const {
    loading: createLoading,
    error: createError,
    insertDocument,
  } = useCreateItemHook<CategoryModel>(COLLECTIONS.Categories);
  const {
    loading: updateLoading,
    error: updateError,
    updateDocument,
  } = useUpdateItemHook<CategoryModel>(COLLECTIONS.Categories);

  const [localCategory, setLocalCategory] = useState<CategoryModel>({
    id: "",
    name: "",
    icon: "",
    color: "#000000",
  });

  const handleColorChange = (newColor: { hex: string }) => {
    setColor(newColor.hex);
    setLocalCategory((prevState) => ({ ...prevState, color: newColor.hex }));
  };

  const { IconSelectComponent, loadIcons } = ReusableIconSelection({
    icons: CategoryIcons,
    selectedIcon: localCategory.icon || "",
    onIconSelect: handleIconSelect,
    color: color,
  });

  function handleIconSelect(iconName: string) {
    setLocalCategory({ ...localCategory, icon: iconName });
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (isEditMode && editCategory) {
          setLocalCategory((prevState) => {
            const updatedState = { ...prevState, ...editCategory };
            handleIconSelect(editCategory.icon || "");
            setColor(editCategory.color);
            return updatedState;
          });
        } else {
          const randomColor = getRandomColor();
          setColor(randomColor);
          setLocalCategory((prevState) => ({ ...prevState, color: randomColor }));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
    loadIcons();
  }, [editCategory]);

  const handleFormSubmit = useCallback(async () => {
    if (isEditMode) {
      await updateDocument(localCategory);
      if (!updateError) {
        closeForm(localCategory);
        openSuccessSnackbar("Category has been Updated!");
      } else {
        console.error("Update Category error", updateError);
        openSuccessSnackbar("Something went wrong.Please Try Again", true);
      }
    } else {
      await insertDocument(localCategory);
      if (!createError) {
        openSuccessSnackbar("New Category has been Added!");
        setLocalCategory({
          id: "",
          name: "",
          icon: "",
          color: "#000000",
        });
      } else {
        console.error("Add Category error", createError);
        openSuccessSnackbar("Something went wrong. Please Try Again", true);
      }
    }
  }, [isEditMode, localCategory]);

  return (
    <>
      <Dialog
        open={open}
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, background: isDarkMode ? "#1e1e1e" : "#fff", width: 320 },
        }}
      >
        <DialogContent>
          <Stack
            spacing={2}
            px={1.5}
            pt={1.5}
            pb={0}
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit();
            }}
          >
            <TextField
              size="small"
              required
              label="Category Name"
              value={localCategory.name}
              onChange={(e) => {
                if (e.target.value.length <= 35) {
                  setLocalCategory({
                    ...localCategory,
                    name: e.target.value,
                  });
                  setDuplicateDetected(false);
                }
              }}
              error={duplicateDetected}
              helperText={duplicateDetected ? "Category exists." : ""}
              FormHelperTextProps={{ style: { marginLeft: 0 } }}
              disabled={localCategory.name === "Uncategorized"}
            />

            {IconSelectComponent}
            <Box display="flex" justifyContent="center">
              <CirclePicker color={color} onChange={handleColorChange} />
            </Box>

            <Stack>
              <ReusableFormActionButton
                type={isEditMode ? "Update" : "Create"}
                isLoading={createLoading || updateLoading}
                disabled={false}
                isEditMode={isEditMode}
                order={1}
                soloButton={true}
              />

              <ReusableFormActionButton
                type="Cancel"
                disabled={false}
                onCancel={() => closeForm(null)}
                soloButton={true}
                order={2}
              />
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
      {SnackbarComponent}
    </>
  );
};

export default CategoryForm;
