import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

interface StockItem {
  id: number;
  productId: number;
  movementType: "IN" | "OUT";
  quantity: number;
  createdAt: string;
}

interface StockInOutChartProps {
  stock?: StockItem[]; 
}

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const StockInOutChart: React.FC<StockInOutChartProps> = ({ stock = [] }) => {

  const monthlyData = months.map((m) => ({
    month: m,
    stockIn: 0,
    stockOut: 0,
  }));

  stock.forEach((item) => {
    if (!item || !item.createdAt || !item.movementType || item.quantity == null) return;

    const date = new Date(item.createdAt);
    if (isNaN(date.getTime())) return;

    const monthIndex = date.getMonth();
    if (monthIndex < 0 || monthIndex > 11) return; 

    const quantity = Number(item.quantity);
    if (isNaN(quantity)) return;

    if (item.movementType === "IN") {
      monthlyData[monthIndex].stockIn += quantity;
    } else if (item.movementType === "OUT") {
      monthlyData[monthIndex].stockOut += quantity;
    }
  });

  return (
    <div className="bg-white w-full shadow-md rounded-2xl p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Stock In vs Stock Out (12 Months)</h2>

      <div className="w-full h-72">
        <ResponsiveContainer>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="stockIn" fill="#2563EB" name="Stock In" />
            <Bar dataKey="stockOut" fill="#EF4444" name="Stock Out" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockInOutChart;
