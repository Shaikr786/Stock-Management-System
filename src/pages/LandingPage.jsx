import { useNavigate } from "react-router-dom";
import { ShoppingCart, BarChart3, FileText, LogIn } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";

const LandingPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };


  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem("token");

  const handleProfileClick = async () => {
    if (!isOpen) {
      await user;
    }
    setIsOpen(!isOpen);
  };

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(isAuthenticated ? path : "/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 relative">
      {/* Top Navigation */}
      {user ? (
        <div className="absolute top-6 right-6">
          <button
            onClick={handleProfileClick}
            className="px-4 py-2 bg-gray-700 bg-opacity-70 hover:bg-opacity-100 rounded-md transition"
          >
            Profile
          </button>

          {/* User Dropdown with Glassmorphism Effect */}
          {isOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-black  text-gray-800 rounded-lg shadow-lg border border-white/20 transition-all duration-300">
                <div className="p-4 border-b border-white/20">
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="text-sm text-gray-300">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-white hover:bg-white/20 rounded-b-lg transition"
                >
                  Logout
                </button>
              </div>
            )}

        </div>
      ) : (
        <div className="absolute top-6 right-6 flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="text-white hover:text-blue-400 transition duration-300"
          >
            Login
          </button>
          <span className="text-gray-500">|</span>
          <button
            onClick={() => navigate("/auth/register")}
            className="text-white hover:text-green-400 transition duration-300"
          >
            Register
          </button>
        </div>
      )}

      {/* Hero Section */}
      <header className="text-center max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Stock Management System</h1>
        <p className="text-gray-300">
          A powerful tool to track inventory, manage stock levels, and generate reports efficiently.
        </p>
      </header>

      {/* Features Section */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {[
          {
            path: "/products",
            icon: <ShoppingCart size={40} className="text-yellow-400 mx-auto mb-3" />,
            title: "Product Management",
            description: "Easily add, edit,update and delete products in stock.",
          },
          {
            path: "/stock-overview",
            icon: <BarChart3 size={40} className="text-green-400 mx-auto mb-3" />,
            title: "Stock Overview",
            description: "Review available stock, items sold, and revenue trends.",
          },
          {
            path: "/analytics",
            icon: <FileText size={40} className="text-purple-400 mx-auto mb-3" />,
            title: "Analytics",
            description: "Generate reports in charts.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            onClick={() => handleNavigation(feature.path)}
            className="bg-gray-800 p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 transition duration-300"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-400 mt-2">{feature.description}</p>
          </div>
        ))}

        {!isAuthenticated && (
          <div
            onClick={() => navigate("/login")}
            className="bg-gray-800 p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-700 transition duration-300"
          >
            <LogIn size={40} className="text-red-400 mx-auto mb-3" />
            <h3 className="text-xl font-semibold">Secure Login</h3>
            <p className="text-gray-400 mt-2">Ensure security with JWT-based authentication.</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-12 text-gray-500 text-center">
        &copy; {new Date().getFullYear()} Stock Management System By Shaik Reshma
      </footer>
    </div>
  );
};

export default LandingPage;
