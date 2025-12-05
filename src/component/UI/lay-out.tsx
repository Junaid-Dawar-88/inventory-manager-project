// lay-out.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Package, Settings, LogOut } from 'lucide-react';

const Lay_out = ({ children }: any) => {
  const [sidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="w-full h-screen bg-gray-50">
      <div className="flex h-full">

        {/* Sidebar */}
        <div
          className={`${sidebarOpen ? 'w-64' : 'w-20'} 
            bg-gray-900 text-white transition-all duration-300 
            ease-in-out flex flex-col`}
        >
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            {sidebarOpen && <h1 className="text-2xl font-bold">Logo</h1>}

            <button
              onClick={() => setIsSidebarOpen(!sidebarOpen)}
              className="hover:bg-gray-800 p-2 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">

              {/* Dashboard */}
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <Home size={20} />
                {sidebarOpen && <span>Dashboard</span>}
              </Link>

              {/* Products */}
              <Link
                to="/products"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Package size={20} />
                {sidebarOpen && <span>Products</span>}
              </Link>

              {/* Stock */}
              <Link
                to="/stock"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Settings size={20} />
                {sidebarOpen && <span>Stock</span>}
              </Link>

            </div>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer text-red-400">
              <LogOut size={20} />
              {sidebarOpen && <span>Logout</span>}
            </div>
          </div>

        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto p-4">{children}</div>

      </div>
    </div>
  );
};

export default Lay_out;
