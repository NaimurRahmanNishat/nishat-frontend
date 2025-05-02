// api intregration backend to frontend
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/getBaseUrl";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/auth`,
    credentials: "include",
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),
    // login user
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    // logout user
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    // edit profile
    editProfile: builder.mutation({
      query: ({profileData, id}) => ({
        url: `/edit-profile/${id}`,
        method: "PATCH",
        body: profileData,
      }),
    }),
    // get users
    getUsers: builder.query({
      query: () => ({
          url: "/users",
          method: 'GET'
      }),
      refetchOnMount: true,
      invalidatesTags: ["Users"],
  }),
    // delete user
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    // update user role
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: {role}
      }),
      refetchOnMount: true,
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useEditProfileMutation, useGetUsersQuery, useDeleteUserMutation, useUpdateUserRoleMutation } = authApi;
export default authApi;