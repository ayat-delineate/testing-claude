import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar";
import MedicineModal from "../components/MedicineModal";
import SearchBar from "../components/ShopPage/SearchBar";
import MedicineDataProvider from "../components/ShopPage/MedicineDataProvider";
import Pagination from "../components/ShopPage/Pagination";
import { useShopSearchParams } from "../hooks/useSearchParams";

const ShopPage = () => {
  const { params, setSearch, setSort, setPage } = useShopSearchParams();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paginationData, setPaginationData] = useState({
    totalPages: 1,
    totalItems: 0,
    startIndex: 0,
    endIndex: 10,
  });

  const handleViewMedicine = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const handleDataLoaded = (data) => {
    setPaginationData(data);
  };

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

          <SearchBar
            searchTerm={params.search}
            onSearchChange={setSearch}
            sortBy={params.sortBy}
            sortOrder={params.sortOrder}
            onSort={setSort}
          />

          <MedicineDataProvider
            searchParams={params}
            onViewMedicine={handleViewMedicine}
            onDataLoaded={handleDataLoaded}
          />

          <Pagination
            currentPage={params.page}
            totalPages={paginationData.totalPages}
            onPageChange={setPage}
            startIndex={paginationData.startIndex}
            endIndex={paginationData.endIndex}
            totalItems={paginationData.totalItems}
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

export default ShopPage;
