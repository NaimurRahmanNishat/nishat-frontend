import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/getBaseUrl";

const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/products`,
    credentials: "include",
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
    
        if (params.category) {
          searchParams.append("category", params.category);
        }
    
        if (params.color) {
          searchParams.append("color", params.color);
        }
    
        if (params.minPrice !== undefined && params.minPrice !== "") {
          searchParams.append("minPrice", params.minPrice.toString());
        }
    
        if (params.maxPrice) {
          searchParams.append("maxPrice", params.maxPrice.toString());
        }
    
        // pagination (always send valid numbers)
        searchParams.append("page", (params.page || 1).toString());
        searchParams.append("limit", (params.limit || 8).toString());
    
        return `/?${searchParams.toString()}`;
      },
      providesTags: ["products"],
    }),
    // fetchAllProducts: builder.query({
    //   query: (params = {}) => {
    //     const {
    //       category = "",
    //       color = "",
    //       minPrice = 0,
    //       maxPrice = "",
    //       page = 1,
    //       limit = "",
    //     } = params;
    //     const queryParams = new URLSearchParams({
    //       category,
    //       color,
    //       minPrice,
    //       maxPrice,
    //       page: page.toString(),
    //       limit: limit.toString(),
    //     });
    //     return `/?${queryParams}`;
    //   },
    //   providesTags: ["products"],
    // }),
    fetchProductbyId: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "products", id }],
    }),
    AddProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/create-product",
        method: "POST",
        body: newProduct,
        credentials: "include",
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/update-product/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Products", id }],
    }),
    fetchAllCategories: builder.query({
        query: (category)=>({
            url: `/categories?category=${category}`,
            method: "GET",
        })
    })
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchProductbyIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useFetchAllCategoriesQuery 
} = productsApi;
export default productsApi;
