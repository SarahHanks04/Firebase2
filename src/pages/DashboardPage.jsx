import { AuthContext } from "@/context/AuthenticationContext";
import BarChart from "@/utils/Dashboard/BarChart";
import ComplaintSummary from "@/utils/Dashboard/ComplaintSummary";
import EventSummary from "@/utils/Dashboard/EventSummary";
import RecentEntry from "@/utils/Dashboard/RecentEntry";
import RecentCommentList from "@/utils/Dashboard/RecentList/RecentCommentList";
import React, { useContext } from "react";
import { motion } from "framer-motion";
import NewAlert from "@/utils/Dashboard/NewAlert";
import UnreadItems from "@/utils/Dashboard/UnreadItems/UnreadItems";

const DashboardPage = () => {
  const { userName } = useContext(AuthContext);

  // Animation variants for grid items
  const gridItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-[#EAEAEA] lg:pl-10 px-3 lg:ml-[12rem] sm:ml-0 pb-4">
      {/* Header Animation */}
      <motion.header
        className="text-2xl font-semibold text-[#171717] pt-8 sm:pt-12 mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {`Welcome ${userName || "User"},`}
      </motion.header>

      {/* Grid Container */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.2 }}
      >
        {/* Left Section */}
        <div className="lg:col-span-2">
          {/* Recent Entry Animation */}
          <motion.div variants={gridItemVariants}>
            <RecentEntry />
          </motion.div>

          {/* Response Chart Animation */}
          <motion.div variants={gridItemVariants}>
            <h1 className="py-2 text-[19px] font-medium">Response Chart</h1>
            <div className="mt-3">
              <BarChart />
            </div>
          </motion.div>

          {/* Event Summary Animation */}
          <motion.div variants={gridItemVariants}>
            <div className="mt-4">
              <p className="py-5 text-[19px] font-medium">Event Summary</p>
              <EventSummary />
            </div>
          </motion.div>

          {/* Complaint Summary Animation */}
          <motion.div variants={gridItemVariants}>
            <div className="mt-4">
              <p className="py-5 text-[19px] font-medium">Complaint Summary</p>
              <ComplaintSummary />
            </div>
          </motion.div>
        </div>

        {/* Right Section */}
        <motion.div
          className="lg:col-span-1 mt-4 w-full"
          variants={gridItemVariants}
        >
          <div className="">
            <UnreadItems />
          </div>
          <div className="mt-6">
            <RecentCommentList />
          </div>
          <div className="mt-6">
            <NewAlert />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
