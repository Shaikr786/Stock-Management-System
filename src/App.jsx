import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import Register from "./pages/Register";
import ProductManagement from "./components/ProductManagement";
import StockOverview from "./components/StockOverview";
import Analytics from "./components/Analytics";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./pages/LandingPage";
const App = () => {
  return (
    <AuthProvider>
      <Router>
          {/* ToastContainer should be placed at the top level */}
          <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route path="/products" element={ <ProductManagement />} />
            <Route path="/stock-overview" element={ <StockOverview /> } />
            <Route path="/analytics" element= {<Analytics />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;


