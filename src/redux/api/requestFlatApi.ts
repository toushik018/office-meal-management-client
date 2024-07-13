import { tagTypes } from "../tagTypes"
import { baseApi } from "./baseApi"

const requestFlatApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        submitFlatRequest: build.mutation({
            query: (flatData) => ({
                url: '/flat-request',
                method: 'POST',
                data: flatData,
            }),
            invalidatesTags: [tagTypes.flatRequest]
        }),
        getFlatRequest: build.query({
            query: () => {
                return {
                    url: "/flat-requests",
                    method: "GET",
                }
            },
            providesTags: [tagTypes.flatRequest],
        }),
        getRequestsOnMyFlats: build.query({
            query: () => {
                return {
                    url: "/flats-with-requests",
                    method: "GET",
                }
            },
            providesTags: [tagTypes.flatRequest],
        }),
        updateRequestStatus: build.mutation({
            query: ({ requestId, status }) => {
                return {
                    url: "/flat-request/status",
                    method: "PATCH",
                    data: { requestId, status },
                }
            },
            invalidatesTags: [tagTypes.flatRequest],
        })

    }),
})

export const { useSubmitFlatRequestMutation, useGetFlatRequestQuery, useGetRequestsOnMyFlatsQuery, useUpdateRequestStatusMutation } = requestFlatApi
