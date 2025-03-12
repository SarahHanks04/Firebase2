import React from "react";

const Pagination = ({
  currentPage,
  hasNextPage,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  const handlePageChange = (page) => {
    if (page < 1) return;
    onPageChange(page);
  };

  // Calculate the range of items being shown
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between py-6 text-sm">
      {/* Showing X of Y results */}
      <div className="text-gray-600">
        Showing {startItem} - {endItem} of {totalItems} results
      </div>

      {/* Arrow navigation */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-bulb-blue text-white"
          }`}
        >
          ←
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className={`px-3 rounded-md ${
            !hasNextPage
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-bulb-blue text-white"
          }`}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Pagination;
