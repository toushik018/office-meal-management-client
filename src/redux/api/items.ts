import { IMeta } from '@/types';
import { tagTypes } from '../tagTypes';
import { baseApi } from './baseApi';
import { IItem } from '@/types/items/items';

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addItems: build.mutation({
            query: (data) => ({
                url: "/item",
                method: 'POST',
                contentType: 'application/json',
                data: data,
            }),
            invalidatesTags: [tagTypes.item],
        }),

        getAllItems: build.query({
            query: (
                arg: Record<string, any>
            ) => ({
                url: '/items',
                method: 'GET',
                params: arg,
            }),
            transformResponse: (response: { data: IItem[]; meta: IMeta }) => {
                const { meta } = response;
              
                return {
                    items: response.data,
                    meta,
                };
            },
            providesTags: [tagTypes.item],
        }),
        deleteItem: build.mutation({
            query: ({ id }) => ({
                url: `/item/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.item],
        }),
        updateItem: build.mutation({
            query: (data) => ({
                url: `/item/${data.id}`,
                method: 'PUT',
                data: data,
            }),
            invalidatesTags: [tagTypes.item],
        }),
    }),
});

export const {
    useAddItemsMutation,
    useGetAllItemsQuery,
    useDeleteItemMutation,
    useUpdateItemMutation
} = authApi;