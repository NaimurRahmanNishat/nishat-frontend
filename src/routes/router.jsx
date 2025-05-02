import App from "../App.jsx";
import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import ErrorPage from "../components/ErrorPage.jsx";
import Home from "../pages/home/Home.jsx";
import Shop from "../pages/shop/Shop.jsx";
import About from "../pages/about/About.jsx";
import Contact from "../pages/contact/Contact.jsx";
import CategoryPage from "@/pages/category/CategoryPage.jsx";
import SingleProduct from "@/pages/shop/productDetails/SingleProduct.jsx";
import PaymentSuccess from "@/components/PaymentSuccess.jsx";
import DashboardLayout from "@/pages/dashboard/DashboardLayout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import UserDMain from "@/pages/dashboard/user/dashboard/UserDMain.jsx";
import UserOrders from "@/pages/dashboard/user/orders/UserOrders.jsx";
import OrderDetails from "@/pages/dashboard/user/orders/OrderDetails.jsx";
import UserPayments from "@/pages/dashboard/user/payments/UserPayments.jsx";
import UserReviews from "@/pages/dashboard/user/reviews/UserReviews.jsx";
import UserProfile from "@/pages/dashboard/user/profile/UserProfile.jsx";
import AdminDMain from "@/pages/dashboard/admin/dashboard/AdminDMain.jsx";
import ManageUsers from "@/pages/dashboard/admin/users/ManageUsers.jsx";
import ManageOrders from "@/pages/dashboard/admin/orders/ManageOrders.jsx";
import AddProduct from "@/pages/dashboard/admin/addProduct/AddProduct.jsx";
import ManageProduct from "@/pages/dashboard/admin/manageProduct/ManageProduct.jsx";
import UpdateProduct from "@/pages/dashboard/admin/manageProduct/UpdateProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/shop/:id",
        element: <SingleProduct />,
      },
      {
        path: "/categories/:categoryName",
        element: <CategoryPage />,
      },
      {
        path: "/success",
        element: <PaymentSuccess />,
      },
      {
        path: "/orders/:orderId",
        element: <OrderDetails/>,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/dashboard",  // parents absolute path
    element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
    children: [
        // user routes
        {
            path: "",
            element: <UserDMain/>,
        },
      {
        path: "orders",  // children relative path
        element: <UserOrders/>,
      },
      {
        path: "payments",  // children relative path
        element: <UserPayments/>,
      },
      {
        path: "profile",  // children relative path
        element: <UserProfile/>,
      },
      {
        path: "reviews",  // children relative path
        element: <UserReviews/>,
      },

      // admin routes
      {
        path: "admin",  // children relative path
        element: <PrivateRoute role="admin"><AdminDMain/></PrivateRoute>,
      },
      {
        path: "add-product",  // children relative path
        element: <PrivateRoute role="admin"><AddProduct/></PrivateRoute>,
      },
      {
        path: "manage-products",  // children relative path
        element: <PrivateRoute role="admin"><ManageProduct/></PrivateRoute>,
      },
      {
        path: "update-product/:id",  // children relative path
        element: <PrivateRoute role="admin"><UpdateProduct/></PrivateRoute>,
      },
      {
        path: "manage-orders",  // children relative path
        element: <PrivateRoute role="admin"><ManageOrders/></PrivateRoute>,
      },
      {
        path: "users",  // children relative path
        element: <PrivateRoute role="admin"><ManageUsers/></PrivateRoute>,
      },
    ],
  },
]);

export default router;
