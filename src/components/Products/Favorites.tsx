import { ProductModel } from "../../models/ProductModel";

export function saveFavoritesToStorage(favorites: string[]) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function getFavoritesFromStorage() {
  const storedFavorites = localStorage.getItem("favorites");
  return storedFavorites;
}

export const handleFavoriteClick = (
  favorites: string[],
  product: ProductModel,
  setLoading: (favoriteLoading: boolean) => void,
  setFavorites: (favorites: string[]) => void,
  openSuccessSnackbar: (msg: string) => void
) => {
  if (!product.id) {
    console.error("Product ID is undefined");
    return;
  }
  setLoading(true);
  let msg = "";
  let newfavorites: string[] = [];

  if (favorites.includes(product.id)) {
    msg = "Removed from";
    newfavorites = favorites.filter((id) => id !== product.id);
    setFavorites(newfavorites);
  } else {
    msg = "Added to";
    newfavorites = [...favorites, product.id];
    setFavorites(newfavorites);
  }
  saveFavoritesToStorage(newfavorites);

  setTimeout(() => {
    openSuccessSnackbar(`${msg} favorites`);
    setLoading(false);
  }, 500);
};
