import { createBrowserRouter } from "react-router";
import App from "./App";
import ProtectedRoute from "../router/ProtectedRoute";
import { Outlet } from "react-router";
import DashboardHome from "../features/dashboard/pages/DashboardHome";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import LandingPage from "../features/landing/pages/LandingPage";

import { AnimatePresence, motion } from 'framer-motion';

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
        element: (
          <ProtectedRoute>
            <AnimatePresence mode="wait">
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </ProtectedRoute>
        ),
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