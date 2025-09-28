import React from 'react';
import { Heart, Shield, Clock, Users } from 'lucide-react';

const HealthTips = () => {
  const tips = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Heart Health",
      description: "Maintain a healthy heart with regular exercise and proper medication as prescribed by your doctor.",
      color: "text-red-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Immune System",
      description: "Boost your immunity with vitamins and supplements to stay healthy throughout the year.",
      color: "text-blue-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Regular Checkups",
      description: "Schedule regular health checkups and follow your doctor's recommendations for optimal health.",
      color: "text-green-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Family Health",
      description: "Keep your family healthy with proper medication management and preventive care.",
      color: "text-purple-500"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Health & Wellness Tips
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert advice and tips to help you maintain a healthy lifestyle
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors mb-4 ${tip.color}`}>
                {tip.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {tip.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-primary-50 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Medical Advice?
            </h3>
            <p className="text-gray-600 mb-6">
              Our team of healthcare professionals is here to help you with any questions about your medications and health.
            </p>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Consult Our Experts
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthTips;
