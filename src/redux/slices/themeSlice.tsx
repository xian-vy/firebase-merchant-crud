import { createSlice } from "@reduxjs/toolkit";

export const setDarkMode = (darkmode: boolean | null) => {
  localStorage.setItem("darkmode", JSON.stringify(darkmode));
};

export const getDarkMode = () => {
  const storedDarkMode = localStorage.getItem("darkmode");
  return storedDarkMode ? JSON.parse(storedDarkMode) : null;
};

const themeSlice = createSlice({
  name: "theme",
  initialState: { darkMode: getDarkMode() },
  reducers: {
    toggleDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;

export default themeSlice.reducer;
