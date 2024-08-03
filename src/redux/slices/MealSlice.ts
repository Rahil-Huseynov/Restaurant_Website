import { createSlice } from "@reduxjs/toolkit";
import { MealApi } from "../../Services/Api/MealApi";

interface IMeals {
    idCategory: number;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string; 
}

interface IMeal {
    meals: IMeals[];
}

const initialState: IMeal = {
    meals: [],
};

const mealSlice = createSlice({
    name: "mealSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            MealApi.endpoints.getMeal.matchFulfilled,
            (state, action) => {
                state.meals = action.payload.categories;
            }
        );
    },
});

export default mealSlice.reducer;
