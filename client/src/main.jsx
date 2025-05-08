import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Root from "./layout/Root";
import { RouterProvider } from "react-router";
import router from "./routes/Router";
import AuthProvider from "./context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
  <AuthProvider>
    <RouterProvider router={router}>
      <Root />
    </RouterProvider>
  </AuthProvider>
  </QueryClientProvider>
);
