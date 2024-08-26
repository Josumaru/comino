// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/lib/redux/features/counter/counterSlice';
import mangaReducer from "@/lib/redux/features/manga/mangaSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    manga: mangaReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: { counter: CounterState }
export type AppDispatch = AppStore['dispatch'];
