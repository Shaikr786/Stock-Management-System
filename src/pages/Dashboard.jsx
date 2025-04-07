import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div className="h-screen flex justify-center items-center text-white text-lg">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Content */}
      <div className="flex-grow flex flex-col items-center justify-center px-6">
        <h1 className="text-3xl font-semibold mb-4">Welcome, {user.name}!</h1>
        <p className="text-gray-400 mb-8">Manage your stock efficiently with real-time insights.</p>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <Link to="/products" className="p-6 bg-white/10 backdrop-blur-lg rounded-xl text-center hover:bg-white/20 transition">
            <h2 className="text-xl font-semibold">Manage Products</h2>
          </Link>
          <Link to="/stock-overview" className="p-6 bg-white/10 backdrop-blur-lg rounded-xl text-center hover:bg-white/20 transition">
            <h2 className="text-xl font-semibold">Stock Overview</h2>
          </Link>
          <Link to="/analytics" className="p-6 bg-white/10 backdrop-blur-lg rounded-xl text-center hover:bg-white/20 transition">
            <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
