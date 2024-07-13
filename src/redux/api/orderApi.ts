import { tagTypes } from '../tagTypes';
import { baseApi } from './baseApi';

export const orderApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createOrder: build.mutation({
            query: (data) => ({
                url: "/order/create-order",
                method: 'POST',
                contentType: 'application/json',
                data: data,
            }),
            invalidatesTags: [tagTypes.order],
        }),

        getWeeklyMealSchedules: build.query({
            query: ({ weekStart }) => ({
                url: '/order/weekly-schedules',
                method: 'GET',
                params: { weekStart },
            }),
            providesTags: [tagTypes.meal],
        }),

        updateOrder: build.mutation({
            query: (data) => ({
                url: `/order/${data.id}`,
                method: "PATCH",
                contentType: 'application/json',
                data: data,
            }),
            invalidatesTags: [tagTypes.order],
        }),

        deleteOrder: build.mutation({
            query: (data) => ({
                url: `/order/${data.id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.order],
        }),

        getOrdersByUser: build.query({
            query: () => ({
                url: '/orders',
                method: 'GET',
            }),
            providesTags: [tagTypes.order],
        }),

    }),
});

export const {
    useCreateOrderMutation,
    useGetWeeklyMealSchedulesQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    useGetOrdersByUserQuery,
} = orderApi;
