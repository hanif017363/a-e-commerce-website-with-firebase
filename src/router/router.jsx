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
        index: true,
        path: "/",
        element: <Home />,
      },
      { path: "/app", element: <App /> },
      { path: "/cart", element: <Cart /> },
      {
        path: "/addproduct",
        element: (
          <PrivateAdminRoute>
            <ProductAdd />
          </PrivateAdminRoute>
        ),
      },
      { path: "/shop", element: <Shop /> },

      { path: "/login", element: <Login /> },
    ],
  },

  { path: "*", element: <NoFound /> },
]);
