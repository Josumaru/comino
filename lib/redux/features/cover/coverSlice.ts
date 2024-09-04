import { createSlice } from "@reduxjs/toolkit";

interface CoverState {
  value: string[] | null;
}

// Define initial state
const initialState: CoverState = {
  value: null,
};

export const coverSlice = createSlice({
  name: "cover",
  initialState,
  reducers: {
    setCovers: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCovers } = coverSlice.actions;

export default coverSlice.reducer;
