import React from 'react';
import { Link } from 'react-router-dom';
import { mockCategories } from '../data/mockData';
import { ArrowRight, Pill, Droplets, Capsule, Syringe, Heart, Plus } from 'lucide-react';

const CategoryCards = () => {
  const getCategoryIcon = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case 'tablets':
        return <Pill className="w-8 h-8" />;
      case 'syrups':
        return <Droplets className="w-8 h-8" />;
      case 'capsules':
        return <Capsule className="w-8 h-8" />;
      case 'injections':
        return <Syringe className="w-8 h-8" />;
      case 'creams & ointments':
        return <Heart className="w-8 h-8" />;
      case 'supplements':
        return <Plus className="w-8 h-8" />;
      default:
        return <Pill className="w-8 h-8" />;
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the medicines you need by browsing our comprehensive categories
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCategories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group block"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 text-primary-600">
                      {getCategoryIcon(category.name)}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-primary-600">
                        {category.medicineCount}
                      </span>
                      <span className="text-sm text-gray-500">
                        {category.medicineCount === 1 ? 'Medicine' : 'Medicines'}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-primary-600 group-hover:text-primary-700 transition-colors">
                      <span className="text-sm font-medium mr-1">Explore</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
          >
            View All Categories
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
