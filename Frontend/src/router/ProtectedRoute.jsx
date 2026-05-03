import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

// Full-page loading screen shown during initial session check
function SessionLoader() {
  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.5)]">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 opacity-30 animate-ping" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-white font-semibold text-lg tracking-wide">ZENTRIX</p>
          <p className="text-slate-500 text-xs">Restoring session...</p>
        </div>
      </div>
    </div>
  );
}

// Protects routes that require authentication
export default function ProtectedRoute({ children }) {
  const { user, isInitialized } = useSelector((state) => state.auth);

  // Show loader while the initial /get-me check is in progress
  if (!isInitialized) {
    return <SessionLoader />;
  }

  // Not authenticated → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
