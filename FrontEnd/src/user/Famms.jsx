import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Testimonal from './Testimonal';
import Products from './Products';
import Blog from './Blog';
import Contact from './Contact';
import Cart from './Cart';
import CheckoutPage from './CheckoutPage';

import Dashboard from '../admin/Dashboard';
import Categories from '../admin/Categories';
import ProductsAdmin from '../admin/ProductsAdmin';
import Users from '../admin/Users';
import AdminLayout from '../admin/AdminLayout';
import AdminLogin from '../admin/AdminLogin';
import OrdersAdmin from '../admin/OrdersAdmin';
import SettingsPage from '../admin/SettingsPage';

const Famms = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User routes */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/home" element={<><Navbar /><Home /></>} />
        <Route path="/about" element={<><Navbar /><About /></>} />
        <Route path="/testimonal" element={<><Navbar /><Testimonal /></>} />
        <Route path="/products" element={<><Navbar /><Products /></>} />
        <Route path="/checkoutpage" element={<><Navbar /><CheckoutPage /></>} />
        <Route path="/blog" element={<><Navbar /><Blog /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /></>} />
        <Route path="/cart" element={<><Navbar /><Cart /></>} />

        {/* Admin routes inside layout */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/categories" element={<AdminLayout><Categories /></AdminLayout>} />
        <Route path="/productsadmin" element={<AdminLayout><ProductsAdmin /></AdminLayout>} />
        <Route path="/users" element={<AdminLayout><Users /></AdminLayout>} />
        <Route path="/ordersadmin" element={<AdminLayout><OrdersAdmin /></AdminLayout>} />
        <Route path="/settingspage" element={<AdminLayout><SettingsPage /></AdminLayout>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Famms;
