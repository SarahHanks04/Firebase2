import React from "react";
import { useSelector } from "react-redux";
import { User2 } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileSection = () => {
  const profileImage = useSelector((state) => state.profile.profileImage);

  return (
    <div className="flex items-center justify-between space-x-14">
      {/* Separator */}
      <div className="h-12 w-[1px] bg-[#BDBDBD] hidden md:block"></div>
      <Link to="/profile" className="relative">
        <div className="w-10 h-10 rounded-full border border-gray-300 overflow-hidden flex items-center justify-center bg-gray-200">
          {profileImage === "User2" ? (
            <User2 size={24} color="#4A4848" />
          ) : (
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProfileSection;
