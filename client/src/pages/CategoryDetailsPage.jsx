import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';

const CategoryDetailsPage = () => {
  return (
    <>
      <Helmet>
        <title>Category Details - MedicineVendor</title>
        <meta name="description" content="Browse medicines by category" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Category Details</h1>
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">Category details page coming soon...</p>
          </div>
        </main>
      </div>
    </>
  );
};

export default CategoryDetailsPage;
