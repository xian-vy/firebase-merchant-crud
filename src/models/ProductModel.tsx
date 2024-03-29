import { Timestamp } from "firebase/firestore";

export interface ProductVariantsModel {
  name: string;
  price: number;
  cost: number;
}

export interface ProductModel {
  id?: string;
  name: string;
  category_id: string;
  variants?: ProductVariantsModel[];
  price?: number;
  cost: number;
  stock: number;
  img?: string;
  description?: string;
  unavailable?: boolean;
  dateAdded: Timestamp;
  lastModified: Timestamp;
}
