import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { mockMedicines } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Star, Percent } from 'lucide-react';
import Swal from 'sweetalert2';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const DiscountProducts = () => {
  const { addToCart } = useCart();
  
  // Filter medicines with discounts
  const discountMedicines = mockMedicines.filter(medicine => medicine.discountPercentage > 0);

  const handleAddToCart = (medicine) => {
    addToCart(medicine);
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart!',
      text: `${medicine.name} has been added to your cart`,
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    });
  };

  const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    return originalPrice - (originalPrice * discountPercentage / 100);
  };

  if (discountMedicines.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Percent className="w-8 h-8 text-red-500 mr-2" />
            <h2 className="text-3xl font-bold text-gray-900">
              Special Offers
            </h2>
          </div>
          <p className="text-lg text-gray-600">
            Don't miss out on these amazing deals on quality medicines
          </p>
        </div>
        
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="discount-swiper"
        >
          {discountMedicines.map((medicine) => (
            <SwiperSlide key={medicine.id}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
                <div className="relative">
                  <img
                    src={medicine.image}
                    alt={medicine.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      -{medicine.discountPercentage}%
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                    {medicine.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                    {medicine.genericName}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    {medicine.company}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-primary-600">
                        ${calculateDiscountedPrice(medicine.perUnitPrice, medicine.discountPercentage).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${medicine.perUnitPrice.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {medicine.massUnit}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(medicine)}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Swiper Styles */}
        <style jsx global>{`
          .discount-swiper .swiper-button-next,
          .discount-swiper .swiper-button-prev {
            color: #3b82f6;
            background: white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          
          .discount-swiper .swiper-button-next:after,
          .discount-swiper .swiper-button-prev:after {
            font-size: 16px;
          }
          
          .discount-swiper .swiper-button-disabled {
            opacity: 0.3;
          }
        `}</style>
      </div>
    </section>
  );
};

export default DiscountProducts;
