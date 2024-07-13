import { tagTypes } from '../tagTypes';
import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        changePassword: build.mutation({
            query: (data) => ({
                url: "/change-password",
                method: 'POST',
                contentType: 'application/json',
                data: data,
            }),
            invalidatesTags: [tagTypes.user],
        }),

    }),
});

export const {
    useChangePasswordMutation,
} = authApi;