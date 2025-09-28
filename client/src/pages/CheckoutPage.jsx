import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';

const CheckoutPage = () => {
  return (
    <>
      <Helmet>
        <title>Checkout - MedicineVendor</title>
        <meta name="description" content="Complete your purchase" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">Checkout page coming soon...</p>
          </div>
        </main>
      </div>
    </>
  );
};

export default CheckoutPage;
