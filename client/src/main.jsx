import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Root from "./layout/Root";
import { RouterProvider } from "react-router";
import router from "./routes/Router";
import AuthProvider from "./context/AuthProvider";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router}>
      <Root />
    </RouterProvider>
  </AuthProvider>
);
