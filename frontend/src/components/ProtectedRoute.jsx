import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Wraps any page that requires login
// If not logged in → redirect to /login
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // While checking localStorage, show nothing
  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F8F5F0" }}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">🕋</div>
          <div className="text-xl font-semibold" style={{ color: "#1B4332" }}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the page
  return children;
};

export default ProtectedRoute;
