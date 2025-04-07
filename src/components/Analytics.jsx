import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../utils/api"; // Using baseURL configured API
import { useNavigate } from "react-router-dom";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  const navigate = useNavigate();
  const [stockData, setStockData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("totalRevenue");
  const [order, setOrder] = useState("desc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStockData();
    fetchChartData();
  }, [category, sortBy, order]);

  const fetchStockData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/analytics/stock`, {
        params: { sortBy, order }, // Removed category filtering from API
      });
  
      let filteredData = response.data;
  
      // Apply case-insensitive filtering on the frontend
      if (category.trim() !== "") {
        const searchQuery = category.toLowerCase();
        filteredData = filteredData.filter(product =>
          product.category.toLowerCase().includes(searchQuery) ||
          product.name.toLowerCase().includes(searchQuery) // Also checks product name
        );
      }
  
      setStockData(filteredData);
    } catch (error) {
      setError("Error fetching stock data");
      console.error("Error fetching stock data:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const fetchChartData = async () => {
    try {
      const response = await api.get(`/analytics/chart-data`);
      const data = response.data;
      setChartData({
        labels: data.map((item) => item.category),
        datasets: [
          {
            label: "Total Revenue",
            data: data.map((item) => item.totalRevenue || 0),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
          },
          {
            label: "Total Sold",
            data: data.map((item) => item.totalSold || 0),
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
        ],
      });
    } catch (error) {
      setError("Error fetching chart data");
      console.error("Error fetching chart data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col p-8">

     {/* Header */}
<div className="flex items-center justify-between mb-6">
  {/* Back Button */}
  <button 
    onClick={() => navigate("/dashboard")} 
    className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
  >
    <span>Back to Dashboard</span>
  </button>

  {/* Centered Heading */}
  <h1 className="text-2xl font-bold flex-grow text-center">Analytics Dashboard</h1>

  {/* Placeholder for spacing alignment */}
  <div className="w-36"></div>
</div>


      {/* Filters & Sorting */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter by category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 bg-gray-800 border border-gray-600 rounded"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 bg-gray-800 border border-gray-600 rounded"
        >
          <option value="totalRevenue">Sort by Revenue</option>
          <option value="totalSold">Sort by Items Sold</option>
        </select>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className="p-2 bg-gray-800 border border-gray-600 rounded"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {/* Error Handling */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading State */}
      {loading ? (
        <p className="text-gray-400">Loading stock data...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-2 border border-gray-700">Product</th>
              <th className="p-2 border border-gray-700">Category</th>
              <th className="p-2 border border-gray-700">Items Sold</th>
              <th className="p-2 border border-gray-700">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((product) => (
              <tr key={product._id} className="text-center bg-gray-700">
                <td className="p-2 border border-gray-600">{product.name}</td>
                <td className="p-2 border border-gray-600">{product.category}</td>
                <td className="p-2 border border-gray-600">{product.itemsSold}</td>
                <td className="p-2 border border-gray-600">
                  ${product.totalRevenue ? product.totalRevenue.toFixed(2) : "0.00"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Bar Chart */}
      {chartData && (
        <div className="mt-6 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-bold">Sales & Revenue Overview</h2>
          <Bar data={chartData} />
        </div>
      )}
    </div>
    
  );
};

export default Analytics;
