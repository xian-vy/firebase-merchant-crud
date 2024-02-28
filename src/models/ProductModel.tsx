import { Timestamp } from "firebase/firestore";

enum sizes {
  sm = "Small",
  md = "Medium",
  lg = "Large",
}

interface SizeOptions {
  size: sizes;
  price: number;
  stock: number;
}

export interface ProductModel {
  id?: string;
  item_name: string;
  category_id: string;
  sizes?: SizeOptions[];
  price?: number;
  cost: number;
  stock: number;
  reorderLevel?: number;
  lastModified: Timestamp;
  modifiedBy: string;
}
