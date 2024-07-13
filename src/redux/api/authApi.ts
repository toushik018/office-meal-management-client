import { ApiResponse, ResetPasswordResponse } from '@/types/response/response';
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
        forgotPassword: build.mutation({
            query: (data) => ({
                url: "/forget-password",
                method: 'POST',
                data: data,
            }),
            invalidatesTags: [tagTypes.user],
        }),
        resetPassword: build.mutation<ApiResponse<ResetPasswordResponse>, { id: string, password: string, token: string }>({
            query: (body) => {
                const { token, ...rest } = body;
                return {
                    url: '/reset-password',
                    method: 'POST',
                    data: rest,
                    headers: {
                        Authorization: token,
                    },
                };
            },
        }),
    }),
});

export const {
    useChangePasswordMutation, useForgotPasswordMutation, useResetPasswordMutation
} = authApi;