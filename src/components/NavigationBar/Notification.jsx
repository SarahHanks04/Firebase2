import React from "react";
import NotifyIcon from "../../assets/Icons/NotifyIcon.svg";

const Notification = () => {
  return (
    <div className="relative border-[1px] border-[#BDBDBD] rounded-[8px] p-2 bg-white flex justify-center items-center">
      <img
        src={NotifyIcon}
        alt="Notification"
        className="w-[20px] h-[20px] cursor-pointer"
      />
    </div>
  );
};

export default Notification;
