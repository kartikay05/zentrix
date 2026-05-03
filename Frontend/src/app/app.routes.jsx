import { createBrowserRouter } from "react-router";
import App from "./App";
import ProtectedRoute from "../router/ProtectedRoute";
import DashboardHome from "../features/dashboard/pages/DashboardHome";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import LandingPage from "../features/landing/pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />, // Public marketing page at root
      },
      {
        path: "dashboard",
        element: <ProtectedRoute />, // Protects all dashboard routes
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          // Future dashboard routes like /dashboard/incidents go here
        ],
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