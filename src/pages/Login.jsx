import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Validations
    if (!email.trim()) {
      toast.error("Email is required!");
      return;
    }
  
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address!");
      return;
    }
  
    if (!password.trim()) {
      toast.error("Password is required!");
      return;
    }
  
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }
  
    try {
      await login(email, password);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password!");
    }
  };  

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
      {/* Warning Heading */}
      <h3 className="text-red-500 font-semibold text-center mb-2">
        ⚠ Please login first to continue
      </h3>
  
      {/* Login Form */}
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col">
        <input
          type="email"
          placeholder="Email"
          className="mb-3 p-2 w-full bg-gray-700 border border-gray-600 rounded text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-3 p-2 w-full bg-gray-700 border border-gray-600 rounded text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
        >
          Login
        </button>
      </form>
      
      {/* Register Link */}
      <p className="text-center mt-4 text-gray-400">
        New user?{" "}
        <Link to="/auth/register" className="text-blue-400 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  </div>
  );
}  
export default Login;
