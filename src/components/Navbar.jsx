import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const handleProfileClick = async () => {
    if (!isOpen) {
      await user;
    }
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg fixed top-0 left-0 w-full z-10 backdrop-blur-lg bg-opacity-60">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Home Link */}
        <Link to="/" className="text-xl font-bold">
          Stock Management System
        </Link>

        {/* Right Side: User Profile & Logout */}
        {user ? (
          <div className="relative">
            {/* Profile Button */}
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
          <div className="flex items-center gap-4">
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-300">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


