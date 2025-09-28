import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';

const CartPage = () => {
  return (
    <>
      <Helmet>
        <title>Cart - MedicineVendor</title>
        <meta name="description" content="Your shopping cart" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">Cart page coming soon...</p>
          </div>
        </main>
      </div>
    </>
  );
};

export default CartPage;
