import { tagTypes } from '../tagTypes';
import { baseApi } from './baseApi';


export const mealApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createMeal: build.mutation({
            query: (data) => ({
                url: "/meal",
                method: 'POST',
                contentType: 'application/json',
                data: data,
            }),
            invalidatesTags: [tagTypes.meal],
        }),

        getAllMeals: build.query({
            query: (
                arg: Record<string, any>
            ) => ({
                url: '/meals',
                method: 'GET',
                params: arg,
            }),
            providesTags: [tagTypes.meal],
        }),

        deleteMeal: build.mutation({
            query: (data) => ({
                url: `/meal/${data.id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.meal],
        }),
        updateMeal: build.mutation({
            query: (data) => ({
                url: `/meal/${data.id}`,
                method: "PUT",
                data: data,
            }),
            invalidatesTags: [tagTypes.meal],
        }),
        scheduleMeal: build.mutation({
            query: (data) => ({
                url: `/meal/schedule`,
                method: "POST",
                data: data,
            }),
            invalidatesTags: [tagTypes.meal],
        }),
        getMealChoicesForUsers: build.query({
            query: () => ({
                url: "/meals/meal-choices",
                method: "GET",
            }),
            providesTags: [tagTypes.meal],
        }),
    }),
});

export const {
    useCreateMealMutation,
    useGetAllMealsQuery,
    useDeleteMealMutation,
    useScheduleMealMutation,
    useUpdateMealMutation,
    useGetMealChoicesForUsersQuery

} = mealApi;