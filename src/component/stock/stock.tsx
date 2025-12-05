import React, { useEffect, useState } from "react";
import Stock_modal from "./stock-modal";
import { Trash2, Edit2, ArrowDownLeft } from "lucide-react";
import axios from "axios";

interface Stocks {
  id: number;
  productId: number;
  movementType: "IN" | "OUT";
  reason: string;
  quantity: number;
  notes: string;
}

const Stock = () => {
  // { ====================== HOOKS ============================================= }
  const [stock, setStock] = useState<Stocks[]>([]);
  const [updateStock, setUpdateStock] = useState<Stocks | null>(null);
  const [filter, setFilter] = useState<"ALL" | "IN" | "OUT">("ALL");

  // { ============================ GET ALL DATA ================================== }
  const getAlldata = async () => {
    try{
      const res = await axios.get("/api/Stock");
      setStock(res.data);
    } catch {
      alert('check console')
      console.log('stock ui error in gat all stock fn ')
    }
  };

  useEffect(() => {
    getAlldata();
  }, []);

  // { ============================ DELETE FUNCION =============================== }
  const handleDelete = async (id: number) => {
    try{

      const confirmStock = confirm("Are you sure to delete?");
      if (!confirmStock) return;
      const res = await axios.delete(`/api/Stock/${id}`);
      setStock((prev) => prev.filter((item) => item.id !== res.data.id));
    } catch(error) {
      alert('check console')
      console.log('stock ui error in delete fn ')
    }
  };

  // { =============================== Filtered stock based ================================= }
  const filteredStock =
    filter === "ALL"
      ? stock
      : stock.filter((item) => item.movementType === filter);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Stock Management</h1>
            <p className="text-gray-600">Track and manage your inventory movements</p>
          </div>
      {/* { ================================ STOCK MODAL COMPONENT ======================== }     */}
          <Stock_modal
            stock={stock}
            setStock={setStock}
            UpdateStock={updateStock}
            setUpdateStock={setUpdateStock}
          />
        </div>

        {/*{ ================================ Filter Buttons ========================== }*/}
        <div className="mb-6 flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === "ALL"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            All Stock
          </button>
          <button
            onClick={() => setFilter("IN")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === "IN"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Stock In
          </button>
          <button
            onClick={() => setFilter("OUT")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              filter === "OUT"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Stock Out
          </button>
        </div>

        {/*{ =========================== Stock Table =================================== }*/}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Movement Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Reason</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Notes</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStock.length === 0 ? (
                  <tr>
                           <td colSpan={6} className="py-6">
                              <div className="flex items-center justify-center w-full text-center">
                                     No item present here
                                    </div>
                                           </td>
                                   </tr>
                ) :
                (filteredStock.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200 group">
                    <td className="px-6 py-4 text-gray-900 font-medium">#00{item.productId}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <ArrowDownLeft className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-green-600 font-semibold">{item.movementType}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{item.reason}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {item.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{item.notes}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3 transition-opacity duration-200">
                        <button
                          onClick={() => setUpdateStock(item)}
                          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 shadow-lg hover:shadow-blue-500/50"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 shadow-lg hover:shadow-red-500/50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-gray-600 text-sm">
          <p>
            Showing {filteredStock.length} of {stock.length} stock movement
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stock;
