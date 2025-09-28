import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import MedicineModal from "../components/MedicineModal";
import SearchBar from "../components/ShopPage/SearchBar";
import MedicineTable from "../components/ShopPage/MedicineTable";
import Pagination from "../components/ShopPage/Pagination";
import LoadingSpinner from "../components/ShopPage/LoadingSpinner";
import ErrorDisplay from "../components/ShopPage/ErrorDisplay";
import { useCategories, useMedicinesByCategory } from "../hooks/useApi";
import { useShopSearchParams } from "../hooks/useSearchParams";
import { Package, ArrowLeft } from "lucide-react";

const CategoryDetailsPage = () => {
  const { categoryName } = useParams();
  const { params, setSearch, setSort, setPage } = useShopSearchParams();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Pagination state (not used directly but kept for consistency)

  // Convert URL parameter back to category name
  const formattedCategoryName = categoryName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Get categories to find the current one
  const { data: categoriesResponse } = useCategories();
  const categories = categoriesResponse?.data?.data?.categories || [];

  // Find category details
  const category = categories.find(
    (cat) => cat.name.toLowerCase() === formattedCategoryName.toLowerCase()
  );

  // Get medicines for this category
  const {
    data: medicinesResponse,
    isLoading,
    error,
    refetch,
  } = useMedicinesByCategory(category?._id, {
    page: params.page,
    limit: 10,
    search: params.search,
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
  });

  // Extract medicines and pagination data
  const medicines = medicinesResponse?.data?.data?.medicines || [];
  const pagination = medicinesResponse?.data?.data?.pagination || {};
  const totalPages = pagination.pages || 1;
  const totalItems = pagination.total || medicines.length;

  // Pagination calculations
  const startIndex = (params.page - 1) * 10;
  const endIndex = startIndex + 10;

  // Pagination data is calculated directly from API response

  const handleViewMedicine = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  // Handle category not found
  if (!category && categories.length > 0) {
    return (
      <>
        <Helmet>
          <title>Category Not Found - MedicineVendor</title>
        </Helmet>
        <Navbar />
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Category Not Found
              </h3>
              <p className="text-gray-600 mb-4">
                The category "{formattedCategoryName}" does not exist.
              </p>
              <Link
                to="/shop"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Back to Shop
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>{formattedCategoryName} - MedicineVendor</title>
          <meta
            name="description"
            content={`Browse ${formattedCategoryName} medicines`}
          />
        </Helmet>
        <Navbar />
        <LoadingSpinner />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>Error - MedicineVendor</title>
        </Helmet>
        <Navbar />
        <ErrorDisplay error={error} onRetry={refetch} />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{category.name} - MedicineVendor</title>
        <meta
          name="description"
          content={`Browse ${category.name} medicines - ${category.description}`}
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link to="/" className="hover:text-primary-600">
              Home
            </Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-primary-600">
              Shop
            </Link>
            <span>/</span>
            <span className="text-gray-900">{category.name}</span>
          </div>

          {/* Category Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Link
                  to="/shop"
                  className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-1" />
                  Back to Shop
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Package className="w-10 h-10 text-primary-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {category.name}
                  </h1>
                  <p className="text-gray-600 mb-2">{category.description}</p>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      {totalItems} medicines available
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SearchBar
            searchTerm={params.search}
            onSearchChange={setSearch}
            sortBy={params.sortBy}
            sortOrder={params.sortOrder}
            onSort={setSort}
          />

          <MedicineTable
            medicines={medicines}
            onViewMedicine={handleViewMedicine}
          />

          <Pagination
            currentPage={params.page}
            totalPages={totalPages}
            onPageChange={setPage}
            startIndex={startIndex}
            endIndex={endIndex}
            totalItems={totalItems}
          />
        </main>

        {/* Medicine Modal */}
        <MedicineModal
          medicine={selectedMedicine}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedMedicine(null);
          }}
        />
      </div>
    </>
  );
};

export default CategoryDetailsPage;
