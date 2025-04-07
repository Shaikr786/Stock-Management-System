import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../utils/api";

import { useNavigate } from "react-router-dom";

const StockOverview = () => {

  const navigate = useNavigate();
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchStockOverview();
  }, []);

  const fetchStockOverview = async () => {
    try {
      const { data } = await api.get("/stock-overview");
      setStockData(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch stock overview");
    } finally {
      setLoading(false); // Stop loading after data is fetched
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">

      {/* Main Content */}
      <div className="container mx-auto p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
        <button 
  onClick={() => navigate("/dashboard")} 
  className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
>
  <span>Back to Dashboard</span>
</button>
    </div>



      {/* Centered Heading */}
      <h2 className="text-3xl font-bold text-gray-100 mb-6 text-center w-full">
        Stock Overview
      </h2>
        </div>

      {/* Grid Section - Show Skeleton if Loading */}
      <div className="grid grid-cols-3 gap-6 text-center">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="p-6 bg-gray-800 rounded-lg shadow-md animate-pulse">
              <div className="h-6 bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-8 bg-gray-700 rounded w-1/2 mx-auto"></div>
            </div>
          ))
        ) : (
          <>
            <div className="p-6 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-300">Total Items</h3>
              <p className="text-2xl font-bold text-white">{stockData.totalItems}</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-300">Total Sold</h3>
              <p className="text-2xl font-bold text-white">{stockData.totalSold}</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-300">Total Revenue</h3>
              <p className="text-2xl font-bold text-green-400">${stockData.totalRevenue.toFixed(2)}</p>
            </div>
          </>
        )}
      </div>

      {/* Sold Items Section - Show Skeleton if Loading */}
      <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-100 mb-4">Sold Items</h3>
        <ul className="divide-y divide-gray-700">
          {loading ? (
            [...Array(5)].map((_, i) => (
              <li key={i} className="p-4 flex justify-between animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                <div className="h-4 bg-gray-700 rounded w-1/6"></div>
                <div className="h-4 bg-gray-700 rounded w-1/6"></div>
              </li>
            ))
          ) : stockData.soldItems.length > 0 ? (
            stockData.soldItems.map((item, index) => (
              <li key={index} className="p-4 flex justify-between">
                <span className="font-semibold text-white">{item.name}</span> 
                <span className="text-gray-400">{item.category}</span>
                <span className="text-green-500">Sold: {item.quantitySold}</span>
                <span className="text-blue-400">Revenue: ${item.revenueGenerated.toFixed(2)}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">No items sold yet.</p>
          )}
        </ul>
      </div>

      </div>

  );
};

export default StockOverview;
