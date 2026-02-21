import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: "/", 
          element: <Home></Home>,
        },
        {
          path: "/product/:id",
          element: <ProductDetails></ProductDetails>,
        }
      ]
  }]);
  