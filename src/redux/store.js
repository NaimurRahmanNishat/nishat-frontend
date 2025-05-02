import { configureStore } from "@reduxjs/toolkit";
import authApi from "./features/auth/authApi.js";
import authReducer from "./features/auth/authSlice.js";
import productsApi from "./features/products/products.js";
import reviewsApi from "./features/reviews/reviewsApi.js";
import cartReducer from "./features/cart/cartSlice.js";
import orderApi from "./features/orders/orderApi.js";
import statsApi from "./features/stats/statsApi.js";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    cart: cartReducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware,
      reviewsApi.middleware,
      orderApi.middleware,
      statsApi.middleware
    ),
});
