import { tagTypes } from '../tagTypes';
import { baseApi } from './baseApi';


export const authApi = baseApi.injectEndpoints({
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
        // deleteItem: build.mutation({
        //     query: ({ id }) => ({
        //         url: `/item/${id}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: [tagTypes.item],
        // }),
        // updateItem: build.mutation({
        //     query: (data) => ({
        //         url: `/item/${data.id}`,
        //         method: 'PUT',
        //         data: data,
        //     }),
        //     invalidatesTags: [tagTypes.item],
        // }),
    }),
});

export const {
    useCreateMealMutation,
    useGetAllMealsQuery,
    useDeleteMealMutation,
    useScheduleMealMutation,
    useUpdateMealMutation

} = authApi;