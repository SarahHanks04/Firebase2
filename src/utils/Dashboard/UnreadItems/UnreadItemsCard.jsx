import React from "react";

const UnreadItemsCard = ({ imageSrc, type, count }) => {
  return (
    <div className="bg-bulb-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
      {/* Image Icon */}
      <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-full mx-auto">
        <img src={imageSrc} alt={type} className="w-4 h-4" />{" "}
      </div>
      {/* Type */}
      <h3 className="text-[10px] font-semibold text-gray-800 mt-2">{type}</h3>
      {/* Unread Count */}
      <p className="text-gray-600 text-[14px] mt-1">{count} Unread</p>
    </div>
  );
};

export default UnreadItemsCard;
