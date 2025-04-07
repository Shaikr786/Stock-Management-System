import { createContext, useState, useEffect } from "react";
import api from "../utils/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Token in AuthProvider:", token);

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    } else {
      delete api.defaults.headers.common["Authorization"];
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, logging out...");
        logout();
        return;
      }

      console.log("Fetching user with token:", token);
      const { data } = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("User fetched successfully:", data);
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user:", error.response?.data || error.message);
      logout();
    } finally {
      setLoading(false); // ✅ Ensures loading stops
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setLoading(false); // ✅ Stop loading after logout
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
