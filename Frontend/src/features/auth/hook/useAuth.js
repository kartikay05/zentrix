import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading, setError } from '../auth.slice';
import { registerUser, loginUser, getMe, logoutUser } from '../services/auth.api';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  // Helper function to extract error message
  const extractError = (err, defaultMsg) => {
    if (err.errors && err.errors.length > 0) return err.errors[0].message;
    if (err.message) return err.message;
    return defaultMsg;
  };

  // Register
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

  // Login
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

  // Get Current User
  const fetchUser = async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const data = await getMe();
      dispatch(setUser(data.user));
      return { success: true, data };
    } catch (err) {
      const errorMessage = extractError(err, 'Failed to fetch user');
      dispatch(setError(errorMessage));
      dispatch(setUser(null));
      return { success: false, error: errorMessage };
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Logout
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
    handleRegister,
    handleLogin,
    fetchUser,
    handleLogout,
  };
};
