import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useAuth } from '../features/auth/hook/useAuth';

// Root component: silently restores the user session on every page load
// by calling GET /api/auth/get-me with the existing HttpOnly cookie.
export default function App() {
  const { fetchUser } = useAuth();

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Render child routes (dashboard, login, register, etc.)
  return <Outlet />;
}
