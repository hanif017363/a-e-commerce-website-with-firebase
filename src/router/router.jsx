import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import App from "../App";
import NoFound from "../pages/NoFound";
import Root from "../pages/Root";
import Shop from "../pages/Shop";
import SignUp from "../pages/SignUp";
import Cart from "../pages/Cart";
import ProductAdd from "../pages/ProductAdd";
import PrivateAdminRoute from "../components/PrivateAdminRoute";
import AllProduct from "../pages/AllProduct";
import UserData from "../pages/UserData";
import PrivateRoute from "../components/PrivateRoute";
import CheckOut from "../pages/CheckOut";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        index: true, // ✅ No need to specify path: "/"
        element: <Home />,
      },
      { path: "/app", element: <App /> },
      { path: "/cart", element: <Cart /> },
      { path: "/shop", element: <Shop /> },
      { path: "/login", element: <Login /> },

      // ✅ Admin-protected routes separately
      {
        path: "/addproduct",
        element: (
          <PrivateAdminRoute>
            <ProductAdd />
          </PrivateAdminRoute>
        ),
      },
      {
        path: "/allproducts",
        element: (
          <PrivateAdminRoute>
            <AllProduct />
          </PrivateAdminRoute>
        ),
      },
      {
        path: "/allUser",
        element: (
          <PrivateAdminRoute>
            <UserData />
          </PrivateAdminRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <CheckOut />
          </PrivateRoute>
        ),
      },
    ],
  },

  { path: "*", element: <NoFound /> },
]);
