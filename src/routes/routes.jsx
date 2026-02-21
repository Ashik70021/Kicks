import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import All_Items from "../pages/All_Items";

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
        },
        {
          path: "/cart",
          element: <Cart></Cart>,
        },
        {
          path: "/all-items",
          element: <All_Items></All_Items>,
        }
      ]
  }]);
  