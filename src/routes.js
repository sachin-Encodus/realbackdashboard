import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardApp from "./pages/DashboardApp";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import Order from "./pages/Order";
import NotFound from "./pages/Page404";
import User from "./pages/User";
import UserEdit from "./pages/user/UserEdit";
import Orderedit from "./pages/user/OrderEdit";
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "/", element: <Navigate to="/dashboard/app" replace /> },
        { path: "app", element: <DashboardApp /> },
        { path: "order", element: <Order /> },
        { path: "user", element: <User /> },
        { path: "orderUpdate/:userId", element: <Orderedit /> },
        { path: "userUpdate/:userId", element: <UserEdit /> },
        { path: "products", element: <Products /> },
        { path: "blog", element: <Blog /> },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/dashboard" /> },
        // { path: "*", element: <Navigate to="/404" /> },
      ],
    },

    // { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
