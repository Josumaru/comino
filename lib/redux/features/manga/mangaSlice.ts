import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Manga } from "mangadex-full-api";

// Define the initial state as an empty array of Manga
const initialState: Manga[] = [];

export const mangaSlice = createSlice({
  name: "manga",
  initialState,
  reducers: {
    // Add a manga to the state
    addManga: (state, action: PayloadAction<Manga>) => {
      state.push(action.payload);
    },
    // Remove a manga from the state by ID
    removeManga: (state, action: PayloadAction<string>) => {
      return state.filter((manga) => manga.id !== action.payload);
    },
    // Update a manga in the state
    updateManga: (state, action: PayloadAction<Manga>) => {
      const index = state.findIndex((manga) => manga.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    // Set the entire manga list
    setManga: (state, action: PayloadAction<Manga[]>) => {
      return state = action.payload;
    },
  },
});

// Export the actions to be used in components
export const { addManga, removeManga, updateManga, setManga } =
  mangaSlice.actions;

// Export the reducer to be included in the store
export default mangaSlice.reducer;
