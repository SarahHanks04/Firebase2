// WITH SEARCH FUNCTIONALITY AND PAGINATION
import React, { useState } from "react";
import { useFetchResponses } from "@/api/ResponseApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Spinner from "../Spinner/Spinner";
import { useSelector } from "react-redux";
import Pagination from "@/components/Pagination";

function ComplaintTable() {
  const { data: responses, isLoading } = useFetchResponses();
  const searchTerm = useSelector((state) => state.search.term);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );

  // FILTER COMPLAINT
  const complaints =
    responses
      ?.filter((response) => response.formType === "complaint")
      .sort(
        (a, b) => new Date(b.submissionDate) - new Date(a.submissionDate)
      ) || [];

  // Filter complaints based on search term
  const filteredComplaints = complaints.filter((complaint) => {
    if (!searchTerm) return true;

    // Check if any field in the complaint matches the search term
    const fieldMatch = complaint.data.some((field) =>
      String(field.value || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    // Check if the submission date matches the search term
    const submissionDate = new Date(complaint.submissionDate);
    const dateMatch = submissionDate
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Check if the month matches the search term
    const monthMatch = submissionDate
      .toLocaleString("default", { month: "long" })
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return fieldMatch || dateMatch || monthMatch;
  });

  // Paginate the filtered complaints
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedComplaints = filteredComplaints.slice(startIndex, endIndex);
  const hasNextPage = endIndex < filteredComplaints.length;

  // DATE FORMAT
  const formatDateWithOrdinal = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    // DAY SUFFIX
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
  };

  const handleResolve = (id) => {
    // Handle resolve logic here
    console.log(`Resolved complaint with ID: ${id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="px-8 my-4 sm:ml-0 lg:ml-56">
      <h1 className="text-[#111112] font-semibold text-[26px] mb-3 px-2">
        Recent Complaints
      </h1>
      <div className="overflow-x-auto rounded-[8px] shadow border-b border-gray-300">
        {/* Table for larger screens */}
        <div className="hidden sm:block">
          <Table className="min-w-full">
            <TableHeader className="bg-gray-200 text-[20px] font-medium text-[#111112]">
              <TableRow>
                <TableHead className="min-w-[100px]">ID</TableHead>
                <TableHead className="min-w-[200px]">Description</TableHead>
                <TableHead className="min-w-[150px] whitespace-nowrap">
                  Date
                </TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[100px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="px-4">
              {paginatedComplaints.map((complaint) => {
                const complaintMessages = complaint.data
                  .filter((d) => d.type === "textarea")
                  .map((d) => d.value)
                  .join(", ");
                const description = complaintMessages || "No message provided";

                return (
                  <TableRow
                    key={complaint.id}
                    className="bg-[#FAF4F4] px-4 hover:bg-gray-50 text-[#545455] text-[16px]"
                  >
                    <TableCell className="whitespace-nowrap">
                      #{complaint.id}
                    </TableCell>
                    <TableCell>{description}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatDateWithOrdinal(complaint.submissionDate)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`px-3 py-1 rounded-full text-[15px] font-medium ${
                          complaint.status === "unresolved"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {complaint.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {complaint.status === "unresolved" ? (
                        <Button
                          variant="ghost"
                          onClick={() => handleResolve(complaint.id)}
                          className="text-blue-600 px-3 py-1 rounded-md text-[15px]"
                        >
                          Resolve
                        </Button>
                      ) : (
                        <Button
                          disabled
                          className="bg-gray-300 text-gray-500 px-3 rounded-md text-[14px] cursor-not-allowed"
                        >
                          Resolved
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Stacked cards for small screens */}
        <div className="sm:hidden space-y-4">
          {paginatedComplaints.map((complaint) => {
            const complaintMessages = complaint.data
              .filter((d) => d.type === "textarea")
              .map((d) => d.value)
              .join(", ");
            const description = complaintMessages || "No message provided";

            return (
              <div
                key={complaint.id}
                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-[#111112]">
                    ID:
                  </span>
                  <span className="text-sm text-[#545455]">
                    #{complaint.id}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-[#111112]">
                    Description:
                  </span>
                  <span className="text-sm text-[#545455]">{description}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-[#111112]">
                    Date:
                  </span>
                  <span className="text-sm text-[#545455]">
                    {formatDateWithOrdinal(complaint.submissionDate)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-[#111112]">
                    Status:
                  </span>
                  <Badge
                    variant="outline"
                    className={`px-3 py-1 rounded-full text-base font-medium ${
                      complaint.status === "unresolved"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {complaint.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-[#111112]">
                    Action:
                  </span>
                  {complaint.status === "unresolved" ? (
                    <Button
                      variant="ghost"
                      onClick={() => handleResolve(complaint.id)}
                      className="text-blue-500 px-3 py-1 rounded-md text-base"
                    >
                      Resolve
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="bg-gray-300 text-[#545455] px-3 rounded-md text-base cursor-not-allowed"
                    >
                      Resolved
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        onPageChange={handlePageChange}
        totalItems={filteredComplaints.length}
        itemsPerPage={itemsPerPage}
      />
    </section>
  );
}

export default ComplaintTable;
