import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const MealApi = createApi({
    reducerPath: "mealApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://www.themealdb.com/api/json/v1/1/",
    }),
    endpoints: (builder) => ({
        getMeal: builder.query({
            query: () => `categories.php`,
        }),
    }),
});

export const { useGetMealQuery }:any = MealApi;
