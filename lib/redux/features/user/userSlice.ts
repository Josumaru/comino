import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Defined a type for the slice state
interface UserState {
  value: User | null;
}

// Defined the initial state for the slice
const initialState: UserState = {
  value: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
