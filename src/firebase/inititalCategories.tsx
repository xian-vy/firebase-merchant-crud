import { COLLECTIONS } from "../constants/collections";
import { db } from "../firebase";
import { collection, doc, getDocs, setDoc, writeBatch } from "firebase/firestore";

const colors = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#9e9e9e",
  "#607d8b",
];

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export const CATEGORIES_MAIN = [
  {
    name: "Main",
    color: "#ff9800",
    icon: "Dine",
  },
  {
    name: "Drinks",
    color: "#9c27b0",
    icon: "Drinks",
  },
  {
    name: "Sides",
    color: "#2196f3",
    icon: "GroceryStore",
  },
  {
    name: "Desserts",
    color: "#f44336",
    icon: "IceCream",
  },
  {
    name: "Uncategorized",
    color: "#795548",
    icon: "Uncategorized",
  },
];

export const CATEGORIES_ITEMS = [
  {
    name: "Burger",
    mainCategory: "Main",
  },
  {
    name: "Shawarma",
    mainCategory: "Main",
  },
  {
    name: "Fanta",
    mainCategory: "Drinks",
  },
  {
    name: "Salad",
    mainCategory: "Sides",
  },
  {
    name: "Ice Cream",
    mainCategory: "Desserts",
  },
];

export async function populateInitialCategories() {
  const category_main_ref = collection(db, COLLECTIONS.Categories);
  const category_main_snapshot = await getDocs(category_main_ref);

  if (category_main_snapshot.empty) {
    const batch = writeBatch(db);

    for (const category of CATEGORIES_MAIN) {
      const docRef = doc(category_main_ref);
      batch.set(docRef, category);
    }

    try {
      await batch.commit();

      console.log("Initial main categories added successfully.");
    } catch (error) {
      console.error("Error adding initial main categories:", error);
    }
  } else {
    console.log("Initial main categories already exist.");
  }
}
