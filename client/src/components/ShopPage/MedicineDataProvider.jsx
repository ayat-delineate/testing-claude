import React, { Suspense } from "react";
import { useMedicines } from "../../hooks/useApi";
import MedicineTable from "./MedicineTable";
import LoadingSpinner from "./LoadingSpinner";
import ErrorDisplay from "./ErrorDisplay";

const MedicineDataProvider = ({
  searchParams,
  onViewMedicine,
  onDataLoaded,
}) => {
  const {
    data: medicinesResponse,
    isLoading,
    error,
    refetch,
  } = useMedicines({
    page: searchParams.page,
    limit: 10,
    search: searchParams.search,
    sortBy: searchParams.sortBy,
    sortOrder: searchParams.sortOrder,
  });

  // Notify parent component when data is loaded
  React.useEffect(() => {
    if (medicinesResponse && onDataLoaded) {
      const pagination = medicinesResponse?.data?.data?.pagination || {};
      onDataLoaded({
        totalPages: pagination.pages || 1,
        totalItems: pagination.total || 0,
        startIndex: (searchParams.page - 1) * 10,
        endIndex: Math.min(searchParams.page * 10, pagination.total || 0),
      });
    }
  }, [medicinesResponse, searchParams.page, onDataLoaded]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={refetch} />;
  }

  const medicines = medicinesResponse?.data?.data?.medicines || [];

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MedicineTable medicines={medicines} onViewMedicine={onViewMedicine} />
    </Suspense>
  );
};

export default MedicineDataProvider;
