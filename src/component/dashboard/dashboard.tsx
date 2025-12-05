import React, { useEffect, useState } from "react";
import { Package, Boxes, AlertTriangle, TrendingUp } from "lucide-react";
import StockInOutChart from "./stock-in-out-chart";
import axios from "axios";

const Dashboard = () => {
  const [totalStock , setTotalStock] = useState([]);
  const [totalProduct , setTotalProduct] = useState([]);

  const getAllStock = async () => {
    const res = await axios.get('/api/Stock');
    setTotalStock(res.data);
  };

  const getAllProduct = async () => {
    const res = await axios.get('/api/Products');
    setTotalProduct(res.data);
  };
   
  useEffect(() => {
    getAllStock();
    getAllProduct();
  }, []);

  return (
    <div className="p-5">

      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Total Products */}
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between hover:shadow-lg transition">
          <div>
            <h3 className="text-gray-600 text-sm">Total Products</h3>
            <p className="text-3xl font-bold text-blue-600 mt-1">{totalProduct.length}</p>
          </div>
          <Package className="w-12 h-12 text-blue-600 opacity-80" />
        </div>

        {/* Total Stock */}
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between hover:shadow-lg transition">
          <div>
            <h3 className="text-gray-600 text-sm">Total Stock</h3>
            <p className="text-3xl font-bold text-green-600 mt-1">{totalStock.length}</p>
          </div>
          <Boxes className="w-12 h-12 text-green-600 opacity-80" />
        </div>

        {/* Low Stock Items */}
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between hover:shadow-lg transition">
          <div>
            <h3 className="text-gray-600 text-sm">Low Stock Items</h3>
            <p className="text-3xl font-bold text-red-500 mt-1">08</p>
          </div>
          <AlertTriangle className="w-12 h-12 text-red-500 opacity-80" />
        </div>

        {/* Stock Movement */}
        <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between hover:shadow-lg transition">
          <div>
            <h3 className="text-gray-600 text-sm">Stock Movement</h3>
            <p className="text-3xl font-bold text-purple-600 mt-1">+12%</p>
          </div>
          <TrendingUp className="w-12 h-12 text-purple-600 opacity-80" />
        </div>

      </div>

{ totalProduct.length < 5 ? (
  <div className="w-full h-[50px] mt-3 flex items-center pl-5 bg-red-500 text-white"> 
    <h1 className="pl-5 font-bold">YOU HAVE LOW PRODUCT LEVEL THEN 5</h1>
  </div>
) : (
  <div className="w-full h-[50px] mt-3 flex items-center pl-5 bg-blue-500 text-white"> 
    <h1 className="pl-5 font-bold">YOU HAVE HIGH PRODUCT LEVEL</h1>
  </div>
)}


      {/* Chart Section */}
      <div className="mt-10 grid grid-cols-2 w-full lg:grid-cols-1 gap-6">
       <StockInOutChart stock={totalStock} />
      </div>

    </div>
  );
};

export default Dashboard;
