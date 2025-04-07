import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Trash2 ,Edit3} from "lucide-react";
import api from "../utils/api";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";


const ProductManagement = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", price: "", quantityInStock: "" });
  const [sellForm, setSellForm] = useState({ productId: "", quantity: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSellForm, setShowSellForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // Track product being edited


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products. Please try again.");
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSellChange = (e) => {
    const { name, value } = e.target;
    setSellForm((prev) => ({
        ...prev,
        [name]: name === "quantity" ? Number(value) : value, // Convert quantity to a number
    }));
};


  const handleEdit = (product) => {
    setEditingProduct(product._id); // Store product ID for editing
    setForm({ ...product }); // Populate form with existing details
    setShowAddForm(true); // Open the form modal for editing
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.price || !form.quantityInStock) {
      toast.warn("Please fill in all fields before submitting.");
      return;
    }
    try {
        if (editingProduct) {
            // Update existing product
            await api.put(`/products/${editingProduct}`, form);
            toast.success("Product updated successfully");
            setEditingProduct(null); // Clear edit state
          } else {
            // Add new product
            await api.post("/products", form);
            toast.success("Product added successfully");
          }
      fetchProducts();
      setForm({ name: "", category: "", price: "", quantityInStock: "" });
      setShowAddForm(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding product.");
    }
  };

  const handleSellSubmit = async (e) => {
    e.preventDefault();
    if (!sellForm.productId || !sellForm.quantity || sellForm.quantity <= 0) {
      toast.warn("Please select a product and enter a valid quantity.");
      return;
    }
    try {
      await api.post("/sales/sell", sellForm);
      toast.success("Product sold successfully! 💰");
      fetchProducts();
      setSellForm({ productId: "", quantity: "" });
      setShowSellForm(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error selling product.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted successfully! 🗑️");
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error("Error deleting product. Please try again.");
    }
  };

  const handleImportCSV = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) {
      toast.warn("Please select a CSV file to import.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/csv/import-csv", formData, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success("CSV imported successfully! 📂");
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error("Error importing CSV. Please check the file format, and duplicates before Import.");
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await api.get("/csv/export-csv", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "products.csv");
      document.body.appendChild(link);
      link.click();
      toast.success("CSV exported successfully! 📤");
    } catch (error) {
      console.error(error);
      toast.error("Error exporting CSV. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col p-8">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold flex-grow text-center">Product Management</h1>
      <div className="flex gap-4">
        <input type="file" accept=".csv" onChange={handleImportCSV} className="hidden" id="importCSV" />
        <label htmlFor="importCSV" className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded cursor-pointer">Import CSV</label>
        <button onClick={handleExportCSV} className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded">Export CSV</button>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex gap-4 mb-4">
      <button onClick={() => setShowAddForm(!showAddForm)} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">
        {showAddForm ? "Close" : "Add Product"}
      </button>
      <button onClick={() => setShowSellForm(!showSellForm)} className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg">
        {showSellForm ? "Close" : "Sell Product"}
      </button>
    </div>

    {/* Add Product Form */}
    {showAddForm && (
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl shadow-lg grid gap-4 w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-white text-center">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
        <input type="text" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required className="p-3 bg-gray-700 text-white rounded-lg border border-gray-600" />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required className="p-3 bg-gray-700 text-white rounded-lg border border-gray-600" />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required className="p-3 bg-gray-700 text-white rounded-lg border border-gray-600" />
        <input type="number" name="quantityInStock" placeholder="Stock Quantity" value={form.quantityInStock} onChange={handleChange} required className="p-3 bg-gray-700 text-white rounded-lg border border-gray-600" />
        <div className="flex justify-between">
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg">{editingProduct ? "Update Product" : "Add Product"}</button>
          <button type="button" onClick={() => { setShowAddForm(false); setEditingProduct(null); }} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg">Cancel</button>
        </div>
      </form>
    )}

    {/* Sell Product Form */}
    {showSellForm && (
      <form onSubmit={handleSellSubmit} className="bg-gray-800 p-6 rounded-xl shadow-lg grid gap-4 mt-4 w-full max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-white text-center">Sell Product</h2>
        <select name="productId" value={sellForm.productId} onChange={handleSellChange} required className="p-3 bg-gray-700 text-white rounded-lg border border-gray-600">
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>{product.name} (Stock: {product.quantityInStock})</option>
          ))}
        </select>
        <input type="number" name="quantity" placeholder="Enter Quantity" value={sellForm.quantity} onChange={handleSellChange} required className="p-3 bg-gray-700 text-white rounded-lg border border-gray-600" />
        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg">Sell Product</button>
      </form>
    )}

    {/* Product List */}
    <h3 className="text-xl font-bold mb-4 mt-6">Product List</h3>
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-700 text-gray-300">
            <th className="p-3">Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b border-gray-700 text-gray-200">
              <td className="p-3">{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.quantityInStock}</td>
              <td className="flex gap-2">
                <button onClick={() => handleEdit(product)} className="text-blue-400 hover:text-blue-600 p-2">
                  <Edit3 size={20} />
                </button>
                <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:text-red-700 p-2">
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default ProductManagement;
