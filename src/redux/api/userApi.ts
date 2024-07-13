import { IUser, UserRole, UserStatus } from "@/types/user/user";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";
import { IMeta } from "@/types";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        getAllUsers: build.query({
            query: (
                arg: Record<string, any>
            ) => ({
                url: '/users',
                method: 'GET',
                params: arg,
            }),
            transformResponse: (response: { data: IUser[]; meta: IMeta }) => {
                const { meta } = response;
                return {
                    users: response.data,
                    meta,
                };
            },
            providesTags: [tagTypes.user],
        }),
        getMyProfile: build.query({
            query: () => ({
                url: "/me",
                method: "GET",
            }),
            providesTags: [tagTypes.user],
        }),
        updateProfile: build.mutation({
            query: (data) => {
                return {
                    url: "/user/update",
                    method: "PUT",
                    data: data,
                };
            },
            invalidatesTags: [tagTypes.user],
        }),
        updateUserRole: build.mutation({
            query: ({ userId, newRole }: { userId: string, newRole: UserRole }) => {

                return {
                    url: "/user/update-role",
                    method: 'PATCH',
                    data: { userId, newRole }
                }
            },
            invalidatesTags: [tagTypes.user],
        }),
        updateUserStatus: build.mutation({
            query: ({ userId, status }: { userId: string, status: UserStatus }) => ({
                url: "/user/ban",
                method: 'PATCH',
                data: { userId, status },
            }),
            invalidatesTags: [tagTypes.user],
        }),
        deleteUser: build.mutation({
            query: ({ userId }) => {
                return {
                    url: `/delete/${userId}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [tagTypes.user],
        }),
        getAdminStats: build.query({
            query: () => ({
                url: "/admin/stats",
                method: "GET",
            }),
            providesTags: [tagTypes.user],
        }),

    }),
});

export const { useGetAllUsersQuery, useGetMyProfileQuery, useUpdateProfileMutation, useUpdateUserRoleMutation, useUpdateUserStatusMutation, useDeleteUserMutation, useGetAdminStatsQuery } = userApi;
