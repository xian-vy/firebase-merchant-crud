import { CategoryModel } from "../models/CategoryModel";
import { ProductModel } from "../models/ProductModel";

export function getProductCountPerCategory(products: ProductModel[], categories: CategoryModel) {
  const count = products.filter((p) => p.category_id === categories.id);
  return count.length || 0;
}
