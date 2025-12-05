// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lay_out from './component/UI/lay-out';
import Product_table from './component/product/product-table';
import Stock from './component/stock/stock';
import Dashboard from './component/dashboard/dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Lay_out>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Product_table />} />
          <Route path="/stock" element={<Stock />} />
        </Routes>
      </Lay_out>
    </BrowserRouter>
  );
};

export default App;
