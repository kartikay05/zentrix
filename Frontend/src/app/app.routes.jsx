import { createBrowserRouter } from "react-router";
import App from "./App";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import DashboardHome from "../features/dashboard/pages/DashboardHome";
import ProtectedRoute from "../router/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Root: restores session on every load
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

export default router;