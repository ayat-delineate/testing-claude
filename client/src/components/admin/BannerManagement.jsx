import React from "react";
import { Image, Plus } from "lucide-react";

const BannerManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Banner Management
          </h2>
          <p className="text-gray-600">
            Manage homepage banners and advertisements
          </p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Banner
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-8 text-center">
        <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Banner Management
        </h3>
        <p className="text-gray-600">
          Banner management features coming soon...
        </p>
      </div>
    </div>
  );
};

export default BannerManagement;
