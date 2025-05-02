import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/getBaseUrl";

const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: "include",
    }),
    tagTypes: ["Order"],
    endpoints: (builder) => ({
        // get orders by email address
        getOrdersByEmail: builder.query({
            query: (email) => ({
                url: `/${email}`,
                method: "GET",
            }),
            providesTags: ["Order"],
        }),
        // get order by orderId
        getOrderById: builder.query({
            query: (orderId) => ({
                url: `/order/${orderId}`,
                method: "GET",
            }),
            providesTags: ["Order"],
        }),
        // get all orders (admin only)
        getAllOrders: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            providesTags: ["Order"],
        }),
        // update order status (admin only)
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/update-order-status/${id}`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["Order"],
        }),
        // delete order (admin only)
        deleteOrderById: builder.mutation({
            query: (orderId) => ({
                url: `/delete-order/${orderId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Order", id }],
        }),
    }),
});

export const {useGetOrdersByEmailQuery, useGetOrderByIdQuery, useGetAllOrdersQuery, useUpdateOrderStatusMutation, useDeleteOrderByIdMutation} = orderApi;

export default orderApi;