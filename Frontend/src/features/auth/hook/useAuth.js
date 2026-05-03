import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading, setError, setInitialized } from '../auth.slice';
import { registerUser, loginUser, getMe, logoutUser } from '../services/auth.api';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error, isInitialized } = useSelector((state) => state.auth);

  // Helper to extract the right error message from backend response
  const extractError = (err, defaultMsg) => {
    if (err?.errors && err.errors.length > 0) return err.errors[0].message;
    if (err?.message) return err.message;
    if (typeof err === 'string') return err;
    return defaultMsg;
  };

  // --- Silent session restore (called on app mount) ---
  // Does NOT set loading=true so no spinner during background check
  const fetchUser = async () => {
    try {
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch {
      dispatch(setUser(null)); // Cookie expired or not found
    } finally {
      dispatch(setInitialized()); // Always mark session check as complete
    }
  };

  // --- Register ---
  const handleRegister = async (userData) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const data = await registerUser(userData);
      dispatch(setUser(data.user));
      return { success: true, data };
    } catch (err) {
      const errorMessage = extractError(err, 'Registration failed');
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage };
    } finally {
      dispatch(setLoading(false));
    }
  };

  // --- Login ---
  const handleLogin = async (userData) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const data = await loginUser(userData);
      dispatch(setUser(data.user));
      return { success: true, data };
    } catch (err) {
      const errorMessage = extractError(err, 'Login failed');
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage };
    } finally {
      dispatch(setLoading(false));
    }
  };

  // --- Logout ---
  const handleLogout = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      await logoutUser();
      dispatch(setUser(null));
      return { success: true };
    } catch (err) {
      const errorMessage = extractError(err, 'Logout failed');
      dispatch(setError(errorMessage));
      return { success: false, error: errorMessage };
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    user,
    loading,
    error,
    isInitialized,
    fetchUser,
    handleRegister,
    handleLogin,
    handleLogout,
  };
};
