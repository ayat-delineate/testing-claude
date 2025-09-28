import React from 'react';
import { Truck, Shield, Clock, Award, Phone, Mail } from 'lucide-react';

const TrustedPartners = () => {
  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Get your medicines delivered within 24-48 hours",
      color: "text-blue-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality Assured",
      description: "All medicines are verified and FDA approved",
      color: "text-green-600"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for your needs",
      color: "text-purple-600"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Trusted Brands",
      description: "Partnered with leading pharmaceutical companies",
      color: "text-orange-600"
    }
  ];

  const partners = [
    { name: "Pfizer", logo: "https://via.placeholder.com/120x60/3b82f6/ffffff?text=Pfizer" },
    { name: "Johnson & Johnson", logo: "https://via.placeholder.com/120x60/ef4444/ffffff?text=J&J" },
    { name: "Novartis", logo: "https://via.placeholder.com/120x60/10b981/ffffff?text=Novartis" },
    { name: "Roche", logo: "https://via.placeholder.com/120x60/8b5cf6/ffffff?text=Roche" },
    { name: "Merck", logo: "https://via.placeholder.com/120x60/f59e0b/ffffff?text=Merck" },
    { name: "GlaxoSmithKline", logo: "https://via.placeholder.com/120x60/06b6d4/ffffff?text=GSK" }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Trust MedicineVendor?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            We're committed to providing the highest quality healthcare services with unmatched reliability
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 mb-4 ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Partners Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Trusted by Leading Pharmaceutical Companies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 w-auto filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-primary-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Need Help? We're Here for You
          </h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Our dedicated support team is available 24/7 to assist you with any questions or concerns about your medications and orders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>support@medicinevendor.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;
