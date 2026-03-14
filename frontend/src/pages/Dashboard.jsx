import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#F8F5F0" }}
    >
      <div className="text-center">
        <div className="text-6xl mb-4">🕋</div>
        <h1 className="text-2xl font-bold" style={{ color: "#1B4332" }}>
          Welcome, {user?.name}!
        </h1>
        <p style={{ color: "#40916C" }} className="mb-6">
          Dashboard — Coming in Phase 8
        </p>
        <button
          onClick={logout}
          className="px-6 py-2 rounded-full text-white font-semibold"
          style={{ backgroundColor: "#1B4332" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default Dashboard;
