import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    reducers: {
        addMeal: (state, action: PayloadAction<IMeals>) => {
            state.meals.push(action.payload);
        },
        deleteMeal: (state, action: PayloadAction<number>) => {
            state.meals = state.meals.filter(meal => meal.idCategory !== action.payload);
        },
        saveMeals: (state, action: PayloadAction<IMeals[]>) => {
            state.meals = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder.addMatcher(
            MealApi.endpoints.getMeal.matchFulfilled,
            (state, action) => {
                state.meals = action.payload.categories;
            }
        );
    },
});
export const { addMeal, deleteMeal, saveMeals } = mealSlice.actions;
export default mealSlice.reducer;
