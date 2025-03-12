import React from "react";
import { useFetchResponses } from "@/api/ResponseApi";
import Spinner from "../Spinner/Spinner";

const ComplaintSummary = () => {
  const { data: responses, isLoading, isError } = useFetchResponses();

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (isError) return <div className="text-red-500">Error fetching data</div>;

  // Filter complaints and calculate resolved percentage
  const complaints = responses.filter(
    (response) => response.formType === "complaint"
  );
  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status === "resolved"
  ).length;
  const totalComplaints = complaints.length;
  const resolvedPercentage =
    totalComplaints > 0
      ? ((resolvedComplaints / totalComplaints) * 100).toFixed(1)
      : 0;

  return (
    <div className="bg-bulb-white rounded-lg shadow-md p-6">
      <h2 className="text-[14px] font-medium text-[#29292A] mb-4">Complaint</h2>
      <div className="flex justify-between items-center py-4">
        <span className="text-[18px] font-bold text-[#13162D]">
          {resolvedPercentage}%
        </span>
        <div className="flex items-center justify-center w-24 h-24 font-medium text-lg text-[#13162D] border-[3px] border-[#263DF0] rounded-full">
          Resolved
        </div>
      </div>
    </div>
  );
};

export default ComplaintSummary;
