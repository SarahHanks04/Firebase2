import ToggleComponent from "@/components/ToggleComponent";
import FeedbackMetrics from "@/utils/Feedback/FeedbackMetrics";
import FeedbackTable from "@/utils/Feedback/FeedbackTable";
import React from "react";

const FeedbackPage = () => {
  return (
    <div>
      <FeedbackMetrics />
      {/* <FeedbackTable /> */}
      <ToggleComponent />
    </div>
  );
};

export default FeedbackPage;
