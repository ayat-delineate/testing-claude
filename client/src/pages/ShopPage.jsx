import React, { useState, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import MedicineModal from "../components/MedicineModal";
import SearchBar from "../components/ShopPage/SearchBar";
import MedicineTable from "../components/ShopPage/MedicineTable";
import Pagination from "../components/ShopPage/Pagination";
import LoadingSpinner from "../components/ShopPage/LoadingSpinner";
import ErrorDisplay from "../components/ShopPage/ErrorDisplay";
import { useMedicines } from "../hooks/useApi";
import { useShopSearchParams } from "../hooks/useSearchParams";

const ShopPage = () => {
  const { params, setSearch, setSort, setPage } = useShopSearchParams();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  // Use real API call with TanStack Query
  const {
    data: medicinesResponse,
    isLoading,
    error,
    refetch,
  } = useMedicines({
    page: params.page,
    limit: itemsPerPage,
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
  const startIndex = (params.page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleViewMedicine = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Shop - MedicineVendor</title>
          <meta
            name="description"
            content="Browse our wide selection of medicines and healthcare products"
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
          <title>Shop - MedicineVendor</title>
          <meta
            name="description"
            content="Browse our wide selection of medicines and healthcare products"
          />
        </Helmet>
          <Navbar />
        <ErrorDisplay error={error} onRetry={refetch} />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shop - MedicineVendor</title>
        <meta
          name="description"
          content="Browse our wide selection of medicines and healthcare products"
        />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Shop Medicines
            </h1>
            <p className="text-gray-600">
              Browse our comprehensive collection of quality medicines and
              healthcare products
            </p>
          </div>

          <Suspense fallback={<LoadingSpinner />}>
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
          </Suspense>
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

export default ShopPage;
