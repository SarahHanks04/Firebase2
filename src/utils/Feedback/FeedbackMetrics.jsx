// import { useFetchResponses } from "@/api/ResponseApi";
// import { FaBatteryFull, FaCheckCircle, FaClock } from "react-icons/fa";
// import Spinner from "../Spinner/Spinner";

// function FeedbackMetrics() {
//   const { data: responses, isLoading } = useFetchResponses();

//   if (isLoading)
//     return (
//       <div>
//         <Spinner />
//       </div>
//     );

//   // Filter for only feedback form submissions
//   const feedbacks =
//     responses?.filter((response) => response.formType === "feedback") || [];
//   const totalFeedbacks = feedbacks.length;
//   const resolvedFeedbacks = feedbacks.filter(
//     (feedback) => feedback.status === "resolved"
//   ).length;
//   const pendingFeedbacks = totalFeedbacks - resolvedFeedbacks;

//   const percentage = (count) => ((count / totalFeedbacks) * 100).toFixed(1);

//   return (
//     <div className="flex flex-col sm:flex-row gap-[1rem] justify-start items-start p-4 mt-10 sm:ml-0 lg:ml-56">
//       {/* Total Feedbacks */}
//       <div className="bg-bulb-white shadow-lg rounded-lg p-4 w-full sm:w-1/3">
//         <div className="flex items-center justify-between w-full mb-4">
//           <h2 className="text-lg font-semibold text-gray-800">
//             Total Feedbacks
//           </h2>
//           <FaBatteryFull className="text-purple-900 text-lg" />
//         </div>
//         <div className="text-2xl font-bold">{totalFeedbacks}</div>
//         <div className="text-gray-500 text-sm">
//           {percentage(totalFeedbacks)}% feedback rate
//         </div>
//       </div>

//       {/* Resolved Feedbacks */}
//       <div className="bg-bulb-white shadow-lg rounded-lg p-4 w-full sm:w-1/3">
//         <div className="flex items-center justify-between w-full mb-4">
//           <h2 className="text-lg font-semibold text-gray-800">Resolved</h2>
//           <FaCheckCircle className="text-green-500 text-lg" />
//         </div>
//         <div className="text-2xl font-bold">{resolvedFeedbacks}</div>
//         <div className="text-gray-500 text-sm">
//           {percentage(resolvedFeedbacks)}% resolution rate
//         </div>
//       </div>

//       {/* Pending Feedbacks (same as unresolved) */}
//       <div className="bg-bulb-white shadow-lg rounded-lg p-4 w-full sm:w-1/3">
//         <div className="flex items-center justify-between w-full mb-4">
//           <h2 className="text-lg font-semibold text-gray-800">Pending</h2>
//           <FaClock className="text-orange-400 text-lg" />
//         </div>
//         <div className="text-2xl font-bold">{pendingFeedbacks}</div>
//         <div className="text-gray-500 text-sm">
//           {percentage(pendingFeedbacks)}% pending rate
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FeedbackMetrics;

// WITH SEARCH FUNCTIONALITY
import { useFetchResponses } from "@/api/ResponseApi";
import { FaBatteryFull, FaCheckCircle, FaClock } from "react-icons/fa";
import Spinner from "../Spinner/Spinner";
import { useSelector } from "react-redux"; 

function FeedbackMetrics() {
  const { data: responses, isLoading } = useFetchResponses();
  const searchTerm = useSelector((state) => state.search.term);

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );

  // Filter for only feedback form submissions
  const feedbacks =
    responses?.filter((response) => response.formType === "feedback") || [];

  // Filter feedbacks based on search term
  const filteredFeedbacks = feedbacks.filter((feedback) => {
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
  });

  const totalFeedbacks = filteredFeedbacks.length;
  const resolvedFeedbacks = filteredFeedbacks.filter(
    (feedback) => feedback.status === "resolved"
  ).length;
  const pendingFeedbacks = totalFeedbacks - resolvedFeedbacks;

  const percentage = (count) => ((count / totalFeedbacks) * 100).toFixed(1);

  return (
    <div className="flex flex-col sm:flex-row gap-[1rem] justify-start items-start p-4 mt-10 sm:ml-0 lg:ml-56">
      {/* Total Feedbacks */}
      <div className="bg-bulb-white shadow-lg rounded-lg p-4 w-full sm:w-1/3">
        <div className="flex items-center justify-between w-full mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Total Feedbacks
          </h2>
          <FaBatteryFull className="text-purple-900 text-lg" />
        </div>
        <div className="text-2xl font-bold">{totalFeedbacks}</div>
        <div className="text-gray-500 text-sm">
          {percentage(totalFeedbacks)}% feedback rate
        </div>
      </div>

      {/* Resolved Feedbacks */}
      <div className="bg-bulb-white shadow-lg rounded-lg p-4 w-full sm:w-1/3">
        <div className="flex items-center justify-between w-full mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Resolved</h2>
          <FaCheckCircle className="text-green-500 text-lg" />
        </div>
        <div className="text-2xl font-bold">{resolvedFeedbacks}</div>
        <div className="text-gray-500 text-sm">
          {percentage(resolvedFeedbacks)}% resolution rate
        </div>
      </div>

      {/* Pending Feedbacks (same as unresolved) */}
      <div className="bg-bulb-white shadow-lg rounded-lg p-4 w-full sm:w-1/3">
        <div className="flex items-center justify-between w-full mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Pending</h2>
          <FaClock className="text-orange-400 text-lg" />
        </div>
        <div className="text-2xl font-bold">{pendingFeedbacks}</div>
        <div className="text-gray-500 text-sm">
          {percentage(pendingFeedbacks)}% pending rate
        </div>
      </div>
    </div>
  );
}

export default FeedbackMetrics;
