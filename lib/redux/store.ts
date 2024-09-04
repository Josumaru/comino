// app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import mangaReducer from "@/lib/redux/features/manga/mangaSlice";
import userReducer from "@/lib/redux/features/user/userSlice";
import coverReducer from "@/lib/redux/features/cover/coverSlice";

export const store = configureStore({
  reducer: {
    manga: mangaReducer,
    user: userReducer,
    cover: coverReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: { counter: CounterState }
export type AppDispatch = AppStore["dispatch"];