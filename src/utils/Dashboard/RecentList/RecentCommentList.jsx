import { useFetchResponses } from "@/api/ResponseApi";
import React, { useState } from "react";
import RecentComment from "./RecentComment";
import Spinner from "@/utils/Spinner/Spinner";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const RecentCommentList = () => {
  const { data: responses, isLoading, isError } = useFetchResponses();
  const [showAll, setShowAll] = useState(false);
  const searchTerm = useSelector((state) => state.search.term);

  if (isLoading)
    return (
      <div className="text-center py-4">
        <Spinner />
      </div>
    );
  if (isError)
    return (
      <div className="text-center py-4 text-red-500">
        Error fetching responses
      </div>
    );

  // Filter responses based on search term
  const filteredResponses = responses.filter((response) => {
    if (!searchTerm) return true;

    const searchTermLower = searchTerm.toLowerCase();

    // Check if any field in the response matches the search term
    const fieldMatch = response.data.some((field) =>
      String(field.value || "")
        .toLowerCase()
        .includes(searchTermLower)
    );

    // Check if the submission date matches the search term
    const submissionDate = new Date(response.submissionDate);
    const dateMatch = submissionDate
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      .toLowerCase()
      .includes(searchTermLower);

    // Check if the month matches the search term
    const monthMatch = submissionDate
      .toLocaleString("default", { month: "long" })
      .toLowerCase()
      .includes(searchTermLower);

    // Check if the year matches the search term
    const yearMatch = submissionDate
      .getFullYear()
      .toString()
      .includes(searchTermLower);

    // Check if the day matches the search term
    const dayMatch = submissionDate
      .getDate()
      .toString()
      .includes(searchTermLower);

    // Check if the form type matches the search term
    const formTypeMatch = response.formType
      .toLowerCase()
      .includes(searchTermLower);

    return (
      fieldMatch ||
      dateMatch ||
      monthMatch ||
      yearMatch ||
      dayMatch ||
      formTypeMatch
    );
  });

  // Sorting responses from latest to oldest
  const sortedResponses = filteredResponses.sort(
    (a, b) => new Date(b.submissionDate) - new Date(a.submissionDate)
  );

  // Determine which responses to display based on showAll state
  const displayedResponses = showAll
    ? sortedResponses
    : sortedResponses.slice(0, 4);

  return (
    <div className="w-full bg-bulb-white rounded-[8px] p-3">
      <h2 className="text-[19px] font-medium pt-4 mb-4">Recent Comments</h2>
      <motion.div
        className={`overflow-y-auto ${
          showAll ? "max-h-[500px]" : "max-h-none"
        }`}
        initial={false}
        animate={{ height: showAll ? "500px" : "auto" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <AnimatePresence>
          {displayedResponses.length > 0 ? (
            displayedResponses.map((response, index) => (
              <motion.div
                key={response.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <RecentComment response={response} />
              </motion.div>
            ))
          ) : (
            <motion.p
              className="text-gray-600 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              No matching results found for "{searchTerm}".
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
      {sortedResponses.length > 4 && (
        <motion.div
          className="text-center w-full bg-bulb-yellow py-[10px] rounded-[8px] text-bulb-blue mt-8 cursor-pointer"
          onClick={() => setShowAll(!showAll)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showAll ? "Show Less" : "View All"}
        </motion.div>
      )}
    </div>
  );
};

export default RecentCommentList;

// import { useFetchResponses } from "@/api/ResponseApi";
// import React, { useState } from "react";
// import RecentComment from "./RecentComment";
// import Spinner from "@/utils/Spinner/Spinner";

// const RecentCommentList = () => {
//   const { data: responses, isLoading, isError } = useFetchResponses();
//   const [showAll, setShowAll] = useState(false);

//   if (isLoading)
//     return (
//       <div className="text-center py-4">
//         <Spinner />
//       </div>
//     );
//   if (isError)
//     return (
//       <div className="text-center py-4 text-red-500">
//         Error fetching responses
//       </div>
//     );

//   // Sorting responses from latest to oldest
//   const sortedResponses = responses.sort(
//     (a, b) => new Date(b.submissionDate) - new Date(a.submissionDate)
//   );

//   // Determine which responses to display based on showAll state
//   const displayedResponses = showAll
//     ? sortedResponses
//     : sortedResponses.slice(0, 5);

//   return (
//     <div className="w-full bg-bulb-white rounded-[8px] p-3">
//       <h2 className="text-xl font-bold pt-4 mb-4">Recent Comments</h2>
//       {displayedResponses.map((response) => (
//         <RecentComment key={response.id} response={response} />
//       ))}
//       {showAll ? (
//         <div
//           className="text-center w-full bg-bulb-yellow py-[10px] rounded-[8px] text-bulb-blue mt-8 cursor-pointer"
//           onClick={() => setShowAll(false)}
//         >
//           Show Less
//         </div>
//       ) : (
//         <div
//           className="text-center w-full bg-bulb-yellow py-[10px] rounded-[8px] text-bulb-blue mt-8 cursor-pointer"
//           onClick={() => setShowAll(true)}
//         >
//           View All
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecentCommentList;
