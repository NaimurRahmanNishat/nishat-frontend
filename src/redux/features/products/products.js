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
    // fetchAllProduts:  builder.query({
    //     query:({category, color, minPrice, maxPrice, page=1, limit=10}) =>{
    //         const queryParams = new URLSearchParams({
    //             category: category || '',
    //             color: color || '',
    //             minPrice: minPrice || 0,
    //             maxPrice: maxPrice || '',
    //             page: page.toString(),
    //             limit: limit.toString()
    //         })
    //        return `/?${queryParams}`
    //     },
    //     providesTags: ["Products"]
    // }),
    fetchAllProducts: builder.query({
      query: (params = {}) => {
        const {
          category = "",
          color = "",
          minPrice = 0,
          maxPrice = "",
          page = 1,
          limit = "",
        } = params;
        const queryParams = new URLSearchParams({
          category,
          color,
          minPrice,
          maxPrice,
          page: page.toString(),
          limit: limit.toString(),
        });
        return `/?${queryParams}`;
      },
      providesTags: ["products"],
    }),
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
