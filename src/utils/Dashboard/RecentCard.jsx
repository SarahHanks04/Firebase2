import React from "react";
import FeedbackColored from "../../assets/Icons/FeedbackColored.svg";

const RecentCard = React.memo(({ title, subTitle, count, onClick }) => {
  const handleClick = React.useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <div
      className="flex-1 p-6 bg-bulb-white shadow-lg rounded-lg cursor-pointer"
      onClick={handleClick}
    >
      <h2 className="text-[18px] font-semibold">{title}</h2>
      <div className="flex items-start gap-3 mt-8">
        <img
          src={FeedbackColored}
          alt="Feedback Icon"
          size="24"
          className="bg-bulb-lightBlue p-1 rounded-[10px] border border-gray-200"
        />
        <div>
          <p className="text-[12px]">{subTitle}</p>
          <p className="text-[14px] font-bold">{count}</p>
        </div>
      </div>
    </div>
  );
});

export default RecentCard;

// import React from "react";
// import FeedbackColored from "../../assets/Icons/FeedbackColored.svg";

// const RecentCard = ({ title, subTitle, count, onClick }) => (
//   <div
//     className="flex-1 p-6 bg-bulb-white shadow-lg rounded-lg cursor-pointer"
//     onClick={onClick}
//   >
//     <h2 className="text-[18px] font-semibold">{title}</h2>
//     <div className="flex items-start gap-3 mt-8">
//       <img src={FeedbackColored} alt="Feedback Icon" size="24" className="bg-bulb-lightBlue p-1 rounded-[10px] border border-gray-200" />
//       <div>
//         <p className="text-[12px]">{subTitle}</p>
//         <p className="text-[14px] font-bold">{count}</p>
//       </div>
//     </div>
//   </div>
// );

// export default RecentCard;
