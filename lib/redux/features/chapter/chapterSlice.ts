import { createSlice } from "@reduxjs/toolkit";

interface ChapterState {
  value: {
    author: string | null;
    cover: string | null,
  };
}

// Define initial state
const initialState: ChapterState = {
  value: {
    author: null,
    cover: null,
  },
};

export const chapterSlice = createSlice({
  name: "chapter",
  initialState,
  reducers: {
    setChapter: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setChapter } = chapterSlice.actions;

export default chapterSlice.reducer;
