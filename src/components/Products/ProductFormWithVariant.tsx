import ClearIcon from "@mui/icons-material/Clear";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { Button, Divider, IconButton, Stack, TextField } from "@mui/material";
import React from "react";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { ProductVariantsModel } from "../../models/ProductModel";

interface Props {
  productVariants: ProductVariantsModel[];
  setProductVariants: (productVariants: ProductVariantsModel[]) => void;
}
const ProductFormWithVariant = ({ productVariants, setProductVariants }: Props) => {
  const handleVariantChange = <T extends keyof ProductVariantsModel>(
    index: number,
    field: T,
    value: ProductVariantsModel[T]
  ) => {
    const newVariants = [...productVariants];
    newVariants[index][field] = value;
    setProductVariants(newVariants);
  };
  const addVariant = () => {
    setProductVariants([...productVariants, { name: "", price: 0, cost: 0 }]);
  };

  const removeVariant = (index: number) => {
    const newVariants = [...productVariants];
    newVariants.splice(index, 1);
    setProductVariants(newVariants);
  };
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(productVariants);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProductVariants(items);
  };

  return (
    <div style={{ marginTop: 0 }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <Stack direction="column" spacing={1} {...provided.droppableProps} ref={provided.innerRef}>
              <Divider>Variants</Divider>
              {productVariants.map((variant, index) => (
                <Draggable key={index} draggableId={`variant-${index}`} index={index}>
                  {(provided) => (
                    <div className="drag-handle" {...provided.dragHandleProps} style={{ marginTop: "15px" }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <SwapVertIcon fontSize="small" />
                        <TextField
                          label="Variant"
                          variant="outlined"
                          size="small"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          required
                          fullWidth
                          value={variant.name}
                          onChange={(e) => handleVariantChange(index, "name", e.target.value)}
                        />

                        <TextField
                          label="Price"
                          variant="outlined"
                          size="small"
                          required
                          fullWidth
                          inputMode="numeric"
                          inputProps={{ inputMode: "numeric" }}
                          value={variant.price}
                          onChange={(e) => handleVariantChange(index, "price", parseFloat(e.target.value) || 0)}
                        />
                        <TextField
                          label="Cost"
                          variant="outlined"
                          size="small"
                          fullWidth
                          required
                          inputMode="numeric"
                          inputProps={{ inputMode: "numeric" }}
                          value={variant.cost}
                          onChange={(e) => handleVariantChange(index, "cost", parseFloat(e.target.value) || 0)}
                        />
                        <IconButton onClick={() => removeVariant(index)}>
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <Button size="small" onClick={addVariant}>
                Add Variant
              </Button>
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ProductFormWithVariant;
