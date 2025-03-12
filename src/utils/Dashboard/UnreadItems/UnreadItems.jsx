import React from "react";
import { useFetchResponsesByType } from "@/api/ResponseApi";
import UnreadItemsCard from "./UnreadItemsCard";
import FeedbackColored from "../../../assets/Icons/FeedbackColored.svg";
import Spinner from "@/utils/Spinner/Spinner";

const UnreadItems = () => {
  // Fetch unread items for each category
  const { unreadCount: eventsUnread, isLoading: eventsLoading } =
    useFetchResponsesByType("event");
  const { unreadCount: feedbackUnread, isLoading: feedbackLoading } =
    useFetchResponsesByType("feedback");
  const { unreadCount: complaintsUnread, isLoading: complaintsLoading } =
    useFetchResponsesByType("complaint");
  const { unreadCount: extraUnread, isLoading: extraLoading } =
    useFetchResponsesByType("event");

  
  if (eventsLoading || feedbackLoading || complaintsLoading || extraLoading) {
    return <div className="text-center py-4"><Spinner /></div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
      {/* Events Card */}
      <UnreadItemsCard
        imageSrc={FeedbackColored}
        type="Events"
        count={eventsUnread || 0}
      />

      {/* Feedback Card */}
      <UnreadItemsCard
        imageSrc={FeedbackColored}
        type="Feedback"
        count={feedbackUnread || 0}
      />

      {/* Complaints Card */}
      <UnreadItemsCard
        imageSrc={FeedbackColored}
        type="Complaints"
        count={complaintsUnread || 0}
      />

      {/* Extra Category Card */}
      <UnreadItemsCard
        imageSrc={FeedbackColored}
        type="Extra"
        count={extraUnread || 0}
      />
    </div>
  );
};

export default UnreadItems;
