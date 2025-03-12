// import { useFetchResponses } from "@/api/ResponseApi";
// import React, { useState, useMemo, useEffect } from "react";
// import { X } from "lucide-react";

// const ResponseList = ({ type, title }) => {
//   const { data: responses, isError } = useFetchResponses();
//   const [selectedResponse, setSelectedResponse] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // Sort and filter responses
//   const sortedResponses = useMemo(() => {
//     return responses
//       ? responses
//           .sort(
//             (a, b) => new Date(b.submissionDate) - new Date(a.submissionDate)
//           )
//           .filter((res) => res.formType === type)
//       : [];
//   }, [responses, type]);

//   // Show modal if no suggestions
//   useEffect(() => {
//     if (type === "suggestion" && sortedResponses.length === 0) {
//       setShowModal(true);
//     }
//   }, [sortedResponses, type]);

//   // Format date and time
//   const formatDateTime = (isoString) => {
//     const options = {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//       hour: "numeric",
//       minute: "numeric",
//       hour12: true,
//     };
//     return new Date(isoString)
//       .toLocaleDateString("en-US", options)
//       .replace(/AM|PM/, (match) => match.toLowerCase());
//   };

//   // Get full name or "Anonymous"
//   const getResponderName = (response) => {
//     const firstName =
//       response.data.find((field) => field.id === "firstName")?.value || "";
//     const lastName =
//       response.data.find((field) => field.id === "lastName")?.value || "";
//     const nameField = response.data.find((field) => field.id === "name")?.value;

//     if (nameField) return nameField;
//     if (firstName || lastName) return `${firstName} ${lastName}`.trim();
//     return "Anonymous";
//   };

//   if (isError)
//     return (
//       <div className="text-red-500 text-center mt-4">
//         Error loading {title.toLowerCase()}s.
//       </div>
//     );

//   return (
//     <div className="">
//       {/* No Suggestions Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-bulb-white rounded-lg shadow-lg p-4 md:p-6 relative max-w-xs md:max-w-md lg:max-w-lg text-center">
//             <button
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//               onClick={() => setShowModal(false)}
//             >
//               <X size={20} />
//             </button>
//             <h2 className="text-lg font-semibold mb-3">
//               OOPS! There are currently no suggestions
//             </h2>
//           </div>
//         </div>
//       )}

//       {/* Display Responses */}
//       <div className="space-y-4">
//         {sortedResponses.map((response) => {
//           const responderName = getResponderName(response);
//           const message =
//             response.data.find((field) => field.type === "textarea")?.value ||
//             "No message";
//           const dateSubmitted = formatDateTime(response.submissionDate);

//           return (
//             <div
//               key={response.id}
//               className="bg-bulb-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-all"
//             >
//               <h3 className="text-[16px] md:text-[18px] font-normal">
//                 <span className="text-[14px] md:text-[16px] font-normal">
//                   by{" "}
//                 </span>{" "}
//                 {responderName} - {dateSubmitted}
//               </h3>
//               <p className="text-gray-700 mt-2">
//                 {message.slice(0, 30) + (message.length > 30 ? "..." : "")}
//               </p>
//               <button
//                 onClick={() =>
//                   setSelectedResponse(
//                     selectedResponse === response ? null : response
//                   )
//                 }
//                 className="mt-3 bg-transparent text-bulb-blue border border-bulb-yellow px-4 py-2 rounded-full transition text-sm md:text-base"
//               >
//                 {selectedResponse === response
//                   ? "Hide Details"
//                   : "View Details"}
//               </button>

//               {selectedResponse === response && (
//                 <div className="mt-4 border-t pt-4">
//                   <h2 className="text-lg font-semibold mb-2">Full Details</h2>
//                   <div className="space-y-2">
//                     {response.data.map((field, index) => (
//                       <div
//                         key={index}
//                         className="border-b border-gray-200 pb-2"
//                       >
//                         <strong>{field.label}:</strong>{" "}
//                         <span>{field.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ResponseList;

// WITH SEARCH FUNCTIONALITY AND PAGINATION
import { useFetchResponses } from "@/api/ResponseApi";
import React, { useState, useMemo, useEffect } from "react";
import { X } from "lucide-react";
import Pagination from "@/components/Pagination";

const ResponseList = ({
  type,
  title,
  searchTerm,
  currentPage,
  itemsPerPage,
  onPageChange,
}) => {
  const { data: responses, isError } = useFetchResponses();
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Sort and filter responses
  const sortedResponses = useMemo(() => {
    if (!responses) return [];

    return responses
      .sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate)) 
      .filter((res) => res.formType === type) 
      .filter((res) => {
        // Filter by search term
        if (!searchTerm) return true; 

        // Check if any field in the response matches the search term
        return res.data.some((field) => {
          const fieldValue = String(field.value || "").toLowerCase();
          return fieldValue.includes(searchTerm.toLowerCase());
        });
      });
  }, [responses, type, searchTerm]);

  // Paginate the sorted responses
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedResponses = sortedResponses.slice(startIndex, endIndex);
  const hasNextPage = endIndex < sortedResponses.length;

  // Show modal if no suggestions
  useEffect(() => {
    if (type === "suggestion" && sortedResponses.length === 0) {
      setShowModal(true);
    }
  }, [sortedResponses, type]);

  // Format date and time
  const formatDateTime = (isoString) => {
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(isoString)
      .toLocaleDateString("en-US", options)
      .replace(/AM|PM/, (match) => match.toLowerCase());
  };

  // Get full name or "Anonymous"
  const getResponderName = (response) => {
    const firstName =
      response.data.find((field) => field.id === "firstName")?.value || "";
    const lastName =
      response.data.find((field) => field.id === "lastName")?.value || "";
    const nameField = response.data.find((field) => field.id === "name")?.value;

    if (nameField) return nameField;
    if (firstName || lastName) return `${firstName} ${lastName}`.trim();
    return "Anonymous";
  };

  if (isError)
    return (
      <div className="text-red-500 text-center mt-4">
        Error loading {title.toLowerCase()}s.
      </div>
    );

  return (
    <div className="">
      {/* No Suggestions Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-bulb-white rounded-lg shadow-lg p-4 md:p-6 relative max-w-xs md:max-w-md lg:max-w-lg text-center">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-3">
              OOPS! There are currently no suggestions
            </h2>
          </div>
        </div>
      )}

      {/* Display Responses */}
      <div className="space-y-4">
        {paginatedResponses.length > 0 ? (
          paginatedResponses.map((response) => {
            const responderName = getResponderName(response);
            const message =
              response.data.find((field) => field.type === "textarea")?.value ||
              "No message";
            const dateSubmitted = formatDateTime(response.submissionDate);

            return (
              <div
                key={response.id}
                className="bg-bulb-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-all"
              >
                <h3 className="text-[16px] md:text-[18px] font-normal">
                  <span className="text-[14px] md:text-[16px] font-normal">
                    by{" "}
                  </span>{" "}
                  {responderName} - {dateSubmitted}
                </h3>
                <p className="text-gray-700 mt-2">
                  {message.slice(0, 30) + (message.length > 30 ? "..." : "")}
                </p>
                <button
                  onClick={() =>
                    setSelectedResponse(
                      selectedResponse === response ? null : response
                    )
                  }
                  className="mt-3 bg-transparent text-bulb-blue border border-bulb-yellow px-4 py-2 rounded-full transition text-sm md:text-base"
                >
                  {selectedResponse === response
                    ? "Hide Details"
                    : "View Details"}
                </button>

                {selectedResponse === response && (
                  <div className="mt-4 border-t pt-4">
                    <h2 className="text-lg font-semibold mb-2">Full Details</h2>
                    <div className="space-y-2">
                      {response.data.map((field, index) => (
                        <div
                          key={index}
                          className="border-b border-gray-200 pb-2"
                        >
                          <strong>{field.label}:</strong>{" "}
                          <span>{field.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-600 text-center">
            No matching results found for "{searchTerm}".
          </p>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        onPageChange={onPageChange}
        totalItems={sortedResponses.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};

export default ResponseList;
