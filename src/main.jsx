import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "./index.css";

import App from "./App.jsx";
import { RouterProvider, Routes } from "react-router-dom";
import { router } from "./router/router.jsx";
import { AuthProvider } from "./context/AuthContxt.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </AuthProvider>
);
