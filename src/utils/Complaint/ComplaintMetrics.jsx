// WITH SEARCH FUNCTIONALITY
import { useFetchResponses } from "@/api/ResponseApi";
import { FaBatteryFull, FaCheckCircle, FaClock } from "react-icons/fa";
import Spinner from "../Spinner/Spinner";
import { useSelector } from "react-redux";

function ComplaintMetrics() {
  const { data: responses, isLoading } = useFetchResponses();
  const searchTerm = useSelector((state) => state.search.term);

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );

  // FILTER COMPLAINT
  const complaints =
    responses?.filter((response) => response.formType === "complaint") || [];

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

  const totalComplaints = filteredComplaints.length;
  const resolvedComplaints = filteredComplaints.filter(
    (count) => count.status === "resolved"
  ).length;
  const unresolvedComplaints = totalComplaints - resolvedComplaints;

  const percentage = (count) => ((count / totalComplaints) * 100).toFixed(1);

  return (
    <div className="flex flex-col sm:flex-row gap-[1rem] justify-start items-start p-4 mt-10 sm:ml-0 lg:ml-56">
      {/* Total Complaints */}
      <div className="bg-bulb-white shadow-lg rounded-lg p-4 w-full sm:w-1/3">
        <div className="flex items-center justify-between w-full mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Total Complaints
          </h2>
          <FaBatteryFull className="text-purple-900 text-18px" />
        </div>
        <div className="text-2xl font-bold">{totalComplaints}</div>
        <div className="text-gray-500 text-sm">
          {percentage(totalComplaints)}% complaint rate
        </div>
      </div>

      {/* Resolved Complaints */}
      <div className="bg-bulb-white shadow-lg rounded-lg p-4 w-full sm:w-1/3">
        <div className="flex items-center justify-between w-full mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Resolved</h2>
          <FaCheckCircle className="text-green-500 text-lg" />
        </div>
        <div className="text-2xl font-bold">{resolvedComplaints}</div>
        <div className="text-gray-500 text-sm">
          {percentage(resolvedComplaints)}% resolution rate
        </div>
      </div>

      {/* Pending (Unresolved) Complaints */}
      <div className="bg-bulb-white shadow-lg rounded-lg p-4 w-full sm:w-1/3">
        <div className="flex items-center justify-between w-full mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Pending</h2>
          <FaClock className="text-orange-400 text-lg" />
        </div>
        <div className="text-2xl font-bold">{unresolvedComplaints}</div>
        <div className="text-gray-500 text-sm">
          {percentage(unresolvedComplaints)}% pending rate
        </div>
      </div>
    </div>
  );
}

export default ComplaintMetrics;

// import { useFetchResponses } from "@/api/ResponseApi";
// import { FaBatteryFull, FaCheckCircle, FaClock } from "react-icons/fa";
// import Spinner from "../Spinner/Spinner";

// function ComplaintMetrics() {
//   const { data: responses, isLoading } = useFetchResponses();

//   if (isLoading)
//     return (
//       <div>
//         <Spinner />
//       </div>
//     );

//   const complaints =
//     responses?.filter((response) => response.formType === "complaint") || [];
//   const totalComplaints = complaints.length;
//   const resolvedComplaints = complaints.filter(
//     (count) => count.status === "resolved"
//   ).length;
//   const unresolvedComplaints = totalComplaints - resolvedComplaints;

//   const percentage = (count) => ((count / totalComplaints) * 100).toFixed(1);

//   return (
//     <div className="flex flex-col sm:flex-row gap-[1rem] justify-start items-start p-4 mt-10 sm:ml-0 lg:ml-56">
//       {/* Total Complaints */}
//       <div className="bg-bulb-white shadow-lg rounded-lg p-4 w-full sm:w-1/3">
//         <div className="flex items-center justify-between w-full mb-4">
//           <h2 className="text-lg font-semibold text-gray-800">
//             Total Complaints
//           </h2>
//           <FaBatteryFull className="text-purple-900 text-18px" />
//         </div>
//         <div className="text-2xl font-bold">{totalComplaints}</div>
//         <div className="text-gray-500 text-sm">
//           {percentage(totalComplaints)}% complaint rate
//         </div>
//       </div>

//       {/* Resolved Complaints */}
//       <div className="bg-bulb-white shadow-lg rounded-lg p-4 w-full sm:w-1/3">
//         <div className="flex items-center justify-between w-full mb-4">
//           <h2 className="text-lg font-semibold text-gray-800">Resolved</h2>
//           <FaCheckCircle className="text-green-500 text-lg" />
//         </div>
//         <div className="text-2xl font-bold">{resolvedComplaints}</div>
//         <div className="text-gray-500 text-sm">
//           {percentage(resolvedComplaints)}% resolution rate
//         </div>
//       </div>

//       {/* Pending (Unresolved) Complaints */}
//       <div className="bg-bulb-white shadow-lg rounded-lg p-4 w-full sm:w-1/3">
//         <div className="flex items-center justify-between w-full mb-4">
//           <h2 className="text-lg font-semibold text-gray-800">Pending</h2>
//           <FaClock className="text-orange-400 text-lg" />
//         </div>
//         <div className="text-2xl font-bold">{unresolvedComplaints}</div>
//         <div className="text-gray-500 text-sm">
//           {percentage(unresolvedComplaints)}% pending rate
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ComplaintMetrics;
