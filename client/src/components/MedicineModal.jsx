import React from "react";
import {
  X,
  ShoppingCart,
  Package,
  Building,
  DollarSign,
  Percent,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import Swal from "sweetalert2";

const MedicineModal = ({ medicine, isOpen, onClose }) => {
  const { addToCart } = useCart();

  if (!isOpen || !medicine) return null;

  const handleAddToCart = () => {
    addToCart(medicine);
    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `${medicine.name} has been added to your cart`,
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
    onClose();
  };

  const calculateDiscountedPrice = () => {
    if (medicine.discountPercentage > 0) {
      return (
        medicine.perUnitPrice -
        (medicine.perUnitPrice * medicine.discountPercentage) / 100
      );
    }
    return medicine.perUnitPrice;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Medicine Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Medicine Image */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={medicine.image}
                  alt={medicine.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {medicine.discountPercentage > 0 && (
                <div className="flex items-center space-x-2">
                  <Percent className="w-5 h-5 text-red-500" />
                  <span className="text-red-600 font-semibold">
                    {medicine.discountPercentage}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* Medicine Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {medicine.name}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  {medicine.genericName}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {medicine.description}
                </p>
              </div>

              {/* Price Section */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-4 mb-4">
                  <DollarSign className="w-6 h-6 text-primary-600" />
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl font-bold text-primary-600">
                        ${calculateDiscountedPrice().toFixed(2)}
                      </span>
                      {medicine.discountPercentage > 0 && (
                        <span className="text-lg text-gray-500 line-through">
                          ${medicine.perUnitPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Per {medicine.massUnit}
                    </p>
                  </div>
                </div>
              </div>

              {/* Medicine Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="text-sm text-gray-600">Category:</span>
                    <span className="ml-2 font-medium">
                      {medicine.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="text-sm text-gray-600">Company:</span>
                    <span className="ml-2 font-medium">{medicine.company}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="text-sm text-gray-600">Stock:</span>
                    <span
                      className={`ml-2 font-medium ${
                        medicine.stock > 10
                          ? "text-green-600"
                          : medicine.stock > 0
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {medicine.stock > 0
                        ? `${medicine.stock} available`
                        : "Out of stock"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={medicine.stock === 0}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>
                    {medicine.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </span>
                </button>
              </div>

              {/* Stock Warning */}
              {medicine.stock > 0 && medicine.stock <= 10 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ Only {medicine.stock} units left in stock. Order soon!
                  </p>
                </div>
              )}

              {medicine.stock === 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800 text-sm">
                    ❌ This medicine is currently out of stock. Please check
                    back later.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineModal;
