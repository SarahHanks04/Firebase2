import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import ProfileImage from "@/components/ProfileComp/ProfileImage";
import EditableSection from "@/components/ProfileComp/EditableSection";

const ProfilePage = () => {
  const profile = useSelector((state) => state.profile);

  return (
    <motion.section
      className="pt-[1.4rem] max-w-5xl lg:ml-56 overflow-x-hidden px-2 space-y-7"
      initial="hidden"
      animate="visible"
    >
      <motion.header className="flex flex-col sm:flex-row justify-between items-start pt-8 px-2">
        <h1 className="text-[20px] sm:text-[23px] font-semibold">My Profile</h1>
        <div className="flex items-center gap-2">
          <div className="w-[8px] h-[8px] bg-[#ACABAB] rounded-full"></div>
          <span className="text-gray-500 text-[12px] sm:text-[13px]">
            Last Updated: {profile.lastUpdated}
          </span>
        </div>
      </motion.header>

      <ProfileImage />

      <EditableSection
        section="personalInfo"
        title="Personal Information"
        fields={[
          { name: "firstName", label: "First Name", type: "text" },
          { name: "lastName", label: "Last Name", type: "text" },
          { name: "email", label: "Email Address", type: "email" },
          { name: "phoneNumber", label: "Phone Number", type: "tel" },
          { name: "role", label: "Role", type: "text" },
        ]}
      />
    </motion.section>
  );
};

export default ProfilePage;
