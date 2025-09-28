import React from "react";
import { Eye, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import Swal from "sweetalert2";

const MedicineTable = ({ medicines, onViewMedicine }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (medicine) => {
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
  };

  if (medicines.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 text-gray-400 mx-auto mb-4">📦</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No medicines found
        </h3>
        <p className="text-gray-600">
          Try adjusting your search terms or filters to find what you're looking
          for.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Medicine
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {medicines.map((medicine) => (
              <tr
                key={medicine.id || medicine._id}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={medicine.image || "/api/placeholder/48/48"}
                      alt={medicine.name}
                      className="w-12 h-12 rounded-lg object-cover mr-4"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {medicine.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {medicine.genericName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {medicine.company}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {medicine.category?.name || medicine.category || "Unknown"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${medicine.perUnitPrice?.toFixed(2) || "0.00"}
                    {medicine.discountPercentage > 0 && (
                      <span className="ml-2 text-xs text-red-600">
                        -{medicine.discountPercentage}%
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      medicine.stock > 10
                        ? "bg-green-100 text-green-800"
                        : medicine.stock > 0
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {medicine.stock > 0
                      ? `${medicine.stock} left`
                      : "Out of stock"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onViewMedicine(medicine)}
                      className="text-primary-600 hover:text-primary-900 p-1 rounded"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleAddToCart(medicine)}
                      disabled={medicine.stock === 0}
                      className="text-green-600 hover:text-green-900 disabled:text-gray-400 disabled:cursor-not-allowed p-1 rounded"
                      title="Add to Cart"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicineTable;
