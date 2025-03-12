import React, { useState } from "react";
import { useFetchResponsesByType } from "@/api/ResponseApi";
import { useUpdateResponseStatus } from "@/api/ResponseApi";
import FeedbackColored from "../../assets/Icons/FeedbackColored.svg";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewAlert = () => {
  const {
    data: feedbackResponses,
    isLoading,
    isError,
  } = useFetchResponsesByType("feedback");

  const { mutate: updateResponseStatus } = useUpdateResponseStatus();
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Get unresolved feedback for today
  const todaysUnresolvedFeedback = feedbackResponses?.filter(
    (response) =>
      response.status === "unresolved" &&
      new Date(response.submissionDate).toISOString().split("T")[0] === today
  );

  // Calculate the number of unresolved feedback for today
  const newFeedbackCount = todaysUnresolvedFeedback?.length || 0;

  // Open the popup
  const handleViewClick = () => {
    setIsPopupOpen(true);
  };

  // Navigate to the feedbacks page and mark the feedback as viewed
  const handleFeedbackClick = (feedbackId) => {
    updateResponseStatus(
      { responseId: feedbackId, status: "viewed" },
      {
        onSuccess: () => {
          navigate("/feedbacks");
        },
      }
    );
  };

  // Get the name from the feedback data
  const getName = (feedback) => {
    const nameField = feedback.data.find(
      (field) => field.label.toLowerCase() === "name"
    );
    const firstNameField = feedback.data.find(
      (field) => field.label.toLowerCase() === "firstname"
    );
    const lastNameField = feedback.data.find(
      (field) => field.label.toLowerCase() === "lastname"
    );

    if (nameField) {
      return nameField.value;
    } else if (firstNameField && lastNameField) {
      return `${firstNameField.value} ${lastNameField.value}`;
    } else if (firstNameField) {
      return firstNameField.value;
    } else if (lastNameField) {
      return lastNameField.value;
    } else {
      return "Anonymous";
    }
  };

  if (isError) return null;

  return (
    <div className="bg-bulb-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        New Feedback Alert
      </h2>

      {/* Icon and Message */}
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-50 rounded-full">
          <img src={FeedbackColored} alt="Feedback Icon" size={24} />
        </div>
        <p className="text-gray-600 text-[14px]">
          You have{" "}
          <span className="font-semibold text-red-500">{newFeedbackCount}</span>{" "}
          new feedback request to action.
        </p>
      </div>

      {/* View Button */}
      <div className="mt-6">
        <button
          onClick={handleViewClick}
          className="w-full bg-bulb-yellow text-bulb-blue py-2 px-4 rounded-md transition-colors"
          disabled={newFeedbackCount === 0}
        >
          View
        </button>
      </div>

      {/* Popup for Today's Feedback */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg relative">
            {/* Close Button */}
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-black"
            >
              <X size={24} />
            </button>

            {/* Popup Title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Latest Feedback Alerts
            </h2>

            {/* List of Today's Feedback */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {todaysUnresolvedFeedback?.map((feedback) => (
                <div
                  key={feedback.id}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleFeedbackClick(feedback.id)}
                >
                  <p className="text-gray-700">
                    <span className="font-semibold">Name:</span>{" "}
                    {getName(feedback)}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    <span className="font-semibold">Submitted on:</span>{" "}
                    {new Date(feedback.submissionDate).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Close Popup Button */}
            <div className="mt-6">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="w-full bg-bulb-yellow text-bulb-blue py-2 px-4 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewAlert;

// import React from "react";
// import { useFetchResponsesByType } from "@/api/ResponseApi";
// import FeedbackColored from "../../assets/Icons/FeedbackColored.svg";
// import { useNavigate } from "react-router-dom";

// const NewAlert = () => {
//   const {
//     data: feedbackResponses,
//     isLoading,
//     isError,
//   } = useFetchResponsesByType("feedback");

//   const navigate = useNavigate();

//   // Calculate the number of new feedback requests
//   const newFeedbackCount = feedbackResponses?.filter(
//     (response) => response.status === "unresolved"
//   ).length;

//   if (isError || !newFeedbackCount) return null;

//   return (
//     <div className="bg-bulb-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
//       {/* Title */}
//       <h2 className="text-lg font-semibold text-gray-800 mb-4">
//         New Feedback Alert
//       </h2>

//       {/* Icon and Message */}
//       <div className="flex items-center space-x-4">
//         <div className="p-3 bg-blue-50 rounded-full">
//           <img src={FeedbackColored} alt="Feedback Icon" size={24} />
//         </div>
//         <p className="text-gray-600 text-[14px]">
//           You have{" "}
//           <span className="font-semibold text-red-500">{newFeedbackCount}</span>{" "}
//           new feedback requests to action.
//         </p>
//       </div>

//       {/* View Button */}
//       <div className="mt-6">
//         <button
//           onClick={() => navigate("/feedbacks")}
//           className="w-full bg-bulb-yellow text-bulb-blue py-2 px-4 rounded-md transition-colors"
//         >
//           View
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NewAlert;
