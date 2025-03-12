// import { useFetchResponses } from "@/api/ResponseApi";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import Spinner from "../Spinner/Spinner";

// function FeedbackTable() {
//   const { data: responses, isLoading } = useFetchResponses();

//   if (isLoading)
//     return (
//       <div>
//         <Spinner />
//       </div>
//     );

//   // FILTER FEEDBACK
//   const feedbacks =
//     responses
//       ?.filter((response) => response.formType === "feedback")
//       .sort(
//         (a, b) => new Date(b.submissionDate) - new Date(a.submissionDate)
//       ) || [];

//   // DATE FORMAT
//   const formatDateWithOrdinal = (dateString) => {
//     const date = new Date(dateString);
//     const day = date.getDate();
//     const month = date.toLocaleString("en-US", { month: "long" });
//     const year = date.getFullYear();

//     // DAY SUFFIX
//     const getOrdinalSuffix = (day) => {
//       if (day > 3 && day < 21) return "th";
//       switch (day % 10) {
//         case 1:
//           return "st";
//         case 2:
//           return "nd";
//         case 3:
//           return "rd";
//         default:
//           return "th";
//       }
//     };

//     return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
//   };

//   return (
//     <section className="px-5 mt-14 sm:ml-0 lg:ml-56">
//       <div className="overflow-x-auto rounded-lg shadow border-b border-gray-200">
//         {/* Table for larger screens */}
//         <div className="hidden sm:block">
//           <Table className="min-w-full divide-y divide-gray-200">
//             <TableHeader className="bg-gray-50">
//               <TableRow>
//                 <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   ID
//                 </TableHead>
//                 <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Feedback
//                 </TableHead>
//                 <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Date Submitted
//                 </TableHead>
//                 <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </TableHead>
//                 <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Action
//                 </TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody className="bg-white divide-y divide-gray-200">
//               {feedbacks.map((feedback) => {
//                 const feedbackMessages = feedback.data
//                   .filter((d) => d.type === "textarea")
//                   .map((d) => d.value)
//                   .join(", ");
//                 const feedbackText = feedbackMessages || "No feedback provided";

//                 return (
//                   <TableRow key={feedback.id}>
//                     <TableCell className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
//                       #{feedback.id}
//                     </TableCell>
//                     <TableCell className="px-4 py-3 text-sm text-gray-500">
//                       {feedbackText}
//                     </TableCell>
//                     <TableCell className="px-4 py-3 text-sm text-gray-500">
//                       {formatDateWithOrdinal(feedback.submissionDate)}
//                     </TableCell>
//                     <TableCell className="px-4 py-3 text-sm text-gray-500">
//                       {feedback.status}
//                     </TableCell>
//                     <TableCell className="px-4 py-3 text-sm font-medium">
//                       <a
//                         href="#"
//                         className="text-indigo-600 hover:text-indigo-900"
//                       >
//                         View
//                       </a>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </div>

//         {/* Stacked cards for small screens */}
//         <div className="sm:hidden">
//           {feedbacks.map((feedback) => {
//             const feedbackMessages = feedback.data
//               .filter((d) => d.type === "textarea")
//               .map((d) => d.value)
//               .join(", ");
//             const feedbackText = feedbackMessages || "No feedback provided";

//             return (
//               <div
//                 key={feedback.id}
//                 className="bg-white p-4 mb-4 rounded-lg shadow"
//               >
//                 <div className="space-y-2">
//                   <div>
//                     <span className="text-sm font-medium text-gray-900">
//                       ID:
//                     </span>{" "}
//                     <span className="text-sm text-gray-500">
//                       #{feedback.id}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="text-sm font-medium text-gray-900">
//                       Feedback:
//                     </span>{" "}
//                     <span className="text-sm text-gray-500">
//                       {feedbackText}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="text-sm font-medium text-gray-900">
//                       Date Submitted:
//                     </span>{" "}
//                     <span className="text-sm text-gray-500">
//                       {formatDateWithOrdinal(feedback.submissionDate)}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="text-sm font-medium text-gray-900">
//                       Status:
//                     </span>{" "}
//                     <span className="text-sm text-gray-500">
//                       {feedback.status}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="text-sm font-medium text-gray-900">
//                       Action:
//                     </span>{" "}
//                     <a
//                       href="#"
//                       className="text-sm text-indigo-600 hover:text-indigo-900"
//                     >
//                       View
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default FeedbackTable;

// WITH SEARCH FUNCTIONALITY
import { useFetchResponses } from "@/api/ResponseApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Spinner from "../Spinner/Spinner";
import { useSelector } from "react-redux"; 

function FeedbackTable() {
  const { data: responses, isLoading } = useFetchResponses();
  const searchTerm = useSelector((state) => state.search.term); 

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );

  // FILTER FEEDBACK
  const feedbacks =
    responses?.filter((response) => response.formType === "feedback") || [];

  // Filter feedbacks based on search term
  const filteredFeedbacks = feedbacks
    .filter((feedback) => {
      if (!searchTerm) return true; 

      // Check if any field in the feedback matches the search term
      const fieldMatch = feedback.data.some((field) =>
        String(field.value || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );

      // Check if the submission date matches the search term
      const submissionDate = new Date(feedback.submissionDate);
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
    })
    .sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));

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

  return (
    <section className="px-5 mt-14 sm:ml-0 lg:ml-56">
      <div className="overflow-x-auto rounded-lg shadow border-b border-gray-200">
        {/* Table for larger screens */}
        <div className="hidden sm:block">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Feedback
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Submitted
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
              {filteredFeedbacks.map((feedback) => {
                const feedbackMessages = feedback.data
                  .filter((d) => d.type === "textarea")
                  .map((d) => d.value)
                  .join(", ");
                const feedbackText = feedbackMessages || "No feedback provided";

                return (
                  <TableRow key={feedback.id}>
                    <TableCell className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{feedback.id}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-500">
                      {feedbackText}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-500">
                      {formatDateWithOrdinal(feedback.submissionDate)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm text-gray-500">
                      {feedback.status}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-sm font-medium">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </a>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Stacked cards for small screens */}
        <div className="sm:hidden">
          {filteredFeedbacks.map((feedback) => {
            const feedbackMessages = feedback.data
              .filter((d) => d.type === "textarea")
              .map((d) => d.value)
              .join(", ");
            const feedbackText = feedbackMessages || "No feedback provided";

            return (
              <div
                key={feedback.id}
                className="bg-white p-4 mb-4 rounded-lg shadow"
              >
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-900">
                      ID:
                    </span>{" "}
                    <span className="text-sm text-gray-500">
                      #{feedback.id}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">
                      Feedback:
                    </span>{" "}
                    <span className="text-sm text-gray-500">
                      {feedbackText}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">
                      Date Submitted:
                    </span>{" "}
                    <span className="text-sm text-gray-500">
                      {formatDateWithOrdinal(feedback.submissionDate)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">
                      Status:
                    </span>{" "}
                    <span className="text-sm text-gray-500">
                      {feedback.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">
                      Action:
                    </span>{" "}
                    <a
                      href="#"
                      className="text-sm text-indigo-600 hover:text-indigo-900"
                    >
                      View
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeedbackTable;
