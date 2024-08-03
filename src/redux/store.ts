import { configureStore, Store } from "@reduxjs/toolkit";
import { MealApi } from "../Services/Api/MealApi";
import mealSlice from "./slices/MealSlice";

export const store: Store = configureStore({
    reducer: {
        [MealApi.reducerPath]: MealApi.reducer,
        meal: mealSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(MealApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
