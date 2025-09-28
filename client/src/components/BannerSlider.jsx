import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { mockBanners } from '../data/mockData';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BannerSlider = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // Filter only active banners
    const activeBanners = mockBanners.filter(banner => banner.isActive);
    setBanners(activeBanners);
  }, []);

  if (banners.length === 0) {
    return (
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to MedicineVendor</h2>
          <p className="text-lg text-primary-100">Your trusted healthcare partner</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={banners.length > 1}
        className="banner-swiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative h-96 md:h-[500px] overflow-hidden">
              <img
                src={banner.image}
                alt={banner.medicineName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                      {banner.medicineName}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-200 mb-6">
                      {banner.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                        Shop Now
                      </button>
                      <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-lg font-semibold transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .banner-swiper .swiper-button-next,
        .banner-swiper .swiper-button-prev {
          color: white;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          width: 50px;
          height: 50px;
        }
        
        .banner-swiper .swiper-button-next:after,
        .banner-swiper .swiper-button-prev:after {
          font-size: 20px;
        }
        
        .banner-swiper .swiper-pagination-bullet {
          background: white;
          opacity: 0.7;
        }
        
        .banner-swiper .swiper-pagination-bullet-active {
          background: #3b82f6;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default BannerSlider;
