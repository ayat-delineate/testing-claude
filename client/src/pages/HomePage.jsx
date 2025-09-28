import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BannerSlider from '../components/BannerSlider';
import CategoryCards from '../components/CategoryCards';
import DiscountProducts from '../components/DiscountProducts';
import HealthTips from '../components/HealthTips';
import TrustedPartners from '../components/TrustedPartners';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>MedicineVendor - Your Trusted Medicine Partner</title>
        <meta name="description" content="Buy medicines online from trusted vendors. Fast delivery, quality assurance, and expert advice." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main>
          {/* Banner Slider */}
          <BannerSlider />

          {/* Category Cards */}
          <CategoryCards />

          {/* Discount Products */}
          <DiscountProducts />

          {/* Health Tips Section */}
          <HealthTips />

          {/* Trusted Partners Section */}
          <TrustedPartners />

          {/* CTA Section */}
          <section className="py-16 bg-primary-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of satisfied customers who trust us with their healthcare needs
              </p>
              <Link
                to="/shop"
                className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <span className="text-xl font-bold">MedicineVendor</span>
                </div>
                <p className="text-gray-400">
                  Your trusted partner for quality medicines and healthcare solutions.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Tablets</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Syrups</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Capsules</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Injections</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>📧 info@medicinevendor.com</li>
                  <li>📞 +1 (555) 123-4567</li>
                  <li>📍 123 Health Street, Medical City</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 MedicineVendor. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
