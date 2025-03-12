import { useContext, useState } from "react";
import Logo1 from "../../assets/Images/Logo1.png";
import DashboardIcon from "../../assets/Icons/DashboardIcon.svg";
import ComplaintIcon from "../../assets/Icons/Complaint.svg";
import FeedbackIcon from "../../assets/Icons/Feedback.svg";
import SettingsIcon from "../../assets/Icons/Settingsicon.svg";
import DashboardColored from "../../assets/Icons/DashboardColored.svg";
import ComplaintColored from "../../assets/Icons/ComplaintColored.svg";
import FeedbackColored from "../../assets/Icons/FeedbackColored.svg";
import SettingColored from "../../assets/Icons/SettingColored.svg";
import LogoutIcon from "../../assets/Icons/LogoutIcon.svg";
import EditWhite from "../../assets/Icons/EditWhite.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { motion } from "framer-motion";
import { SidebarContext } from "@/context/SidebarContext";
import "../../styles/Sidebarstyle.css"

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const handleNavigation = (path) => {
    if (isSidebarOpen) toggleSidebar();
    navigate(path);
  };

  const toggleEditorDropdown = () => {
    setIsEditorOpen(!isEditorOpen);
  };

  const menuItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: DashboardIcon,
      activeIcon: DashboardColored,
    },
    {
      to: "/complaints",
      label: "Complaints",
      icon: ComplaintIcon,
      activeIcon: ComplaintColored,
    },
    {
      to: "/feedbacks",
      label: "Feedbacks",
      icon: FeedbackIcon,
      activeIcon: FeedbackColored,
    },
    {
      to: "/editor",
      label: "Editor",
      icon: EditWhite,
      activeIcon: EditWhite, 
    },
  ];

  const lastMenuItems = [
    {
      to: "/profile",
      label: "Settings",
      icon: SettingsIcon,
      activeIcon: SettingColored,
    },
    {
      to: "/signIn",
      label: "Logout",
      icon: LogoutIcon,
      onClick: handleLogout,
    },
  ];

  // Variants for staggering list items
  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 25,
      },
    },
  };

  return (
    <div>
      {/* Hamburger Menu */}
      <button
        className="lg:hidden text-[#13162D] p-2 rounded-md fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close Menu" : "Open Menu"}
      >
        {!isSidebarOpen && <HiOutlineMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#13162D] text-[#FAF4F4] w-56 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 flex flex-col pt-[6px]  pl-3 z-40`}
      >
        {/* Sidebar Logo */}
        <div className="p-4 border-b border-gray-700 flex justify-start">
          <img src={Logo1} alt="Logo" className="w-36 md:w-36 lg:w-40 h-auto" />
        </div>

        {/* Menu Items */}
        <motion.nav className="mt-12 flex-grow flex flex-col justify-between">
          <motion.ul
            className="space-y-2"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {menuItems.map((item, index) => (
              <motion.li key={index} variants={itemVariants}>
                <button
                  className={`flex items-center w-full p-2 rounded-md hover:bg-gray-800 ${
                    location.pathname === item.to ? "bg-gray-800" : ""
                  }`}
                  onClick={() => handleNavigation(item.to)}
                >
                  <img
                    src={
                      location.pathname === item.to
                        ? item.activeIcon
                        : item.icon
                    }
                    alt={`${item.label} icon`}
                    className={`w-5 h-5 mr-3 ${
                      item.label === "Editor" && location.pathname === item.to
                        ? "filter-yellow"
                        : ""
                    }`}
                  />
                  <span
                    className={`text-base ${
                      location.pathname === item.to ? "text-bulb-yellow" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </motion.li>
            ))}

            <hr className="border-t border-gray-700 py-[5rem]" />

            <div className="mt-auto text-[#FAF4F4]">
              {lastMenuItems.map((item, index) => (
                <motion.li key={index} variants={itemVariants}>
                  <button
                    className={`flex items-center w-full p-2 rounded-md hover:bg-gray-800 ${
                      item.to === null && "text-[#FAF4F4]"
                    } ${location.pathname === item.to ? "bg-gray-800" : ""}`}
                    onClick={item.onClick || (() => handleNavigation(item.to))}
                  >
                    <img
                      src={
                        location.pathname === item.to
                          ? item.activeIcon
                          : item.icon
                      }
                      alt={`${item.label} icon`}
                      className="w-5 h-5 mr-3"
                    />
                    <span
                      className={`text-base ${
                        location.pathname === item.to ? "text-yellow-400" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                </motion.li>
              ))}
            </div>
          </motion.ul>
        </motion.nav>
      </aside>
    </div>
  );
};

export default Sidebar;



// import { useContext, useState } from "react";
// import Logo1 from "../../assets/Images/Logo1.png";
// import DashboardIcon from "../../assets/Icons/DashboardIcon.svg";
// import ComplaintIcon from "../../assets/Icons/Complaint.svg";
// import FeedbackIcon from "../../assets/Icons/Feedback.svg";
// import SettingsIcon from "../../assets/Icons/Settingsicon.svg";
// import DashboardColored from "../../assets/Icons/DashboardColored.svg";
// import ComplaintColored from "../../assets/Icons/ComplaintColored.svg";
// import FeedbackColored from "../../assets/Icons/FeedbackColored.svg";
// import SettingColored from "../../assets/Icons/SettingColored.svg";
// import LogoutIcon from "../../assets/Icons/LogoutIcon.svg";
// import EditWhite from "../../assets/Icons/EditWhite.svg";
// import { useLocation, useNavigate } from "react-router-dom";
// import { HiOutlineMenu } from "react-icons/hi";
// import { motion } from "framer-motion";
// import { SidebarContext } from "@/context/SidebarContext";

// const Sidebar = () => {
//   const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isEditorOpen, setIsEditorOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/");
//   };

//   const handleNavigation = (path) => {
//     if (isSidebarOpen) toggleSidebar();
//     navigate(path);
//   };

//   const toggleEditorDropdown = () => {
//     setIsEditorOpen(!isEditorOpen);
//   };

//   const menuItems = [
//     {
//       to: "/dashboard",
//       label: "Dashboard",
//       icon: DashboardIcon,
//       activeIcon: DashboardColored,
//     },
//     {
//       to: "/complaints",
//       label: "Complaints",
//       icon: ComplaintIcon,
//       activeIcon: ComplaintColored,
//     },
//     {
//       to: "/feedbacks",
//       label: "Feedbacks",
//       icon: FeedbackIcon,
//       activeIcon: FeedbackColored,
//     },
//     {
//       to: "/editor",
//       label: "Editor",
//       icon: EditWhite,
//       activeIcon: EditWhite,
//     },
//   ];

//   const lastMenuItems = [
//     {
//       to: "/profile",
//       label: "Settings",
//       icon: SettingsIcon,
//       activeIcon: SettingColored,
//     },
//     {
//       to: "/signIn",
//       label: "Logout",
//       icon: LogoutIcon,
//       onClick: handleLogout,
//     },
//   ];

//   // Variants for staggering list items
//   const itemVariants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 25,
//       },
//     },
//   };

//   return (
//     <div>
//       {/* Hamburger Menu */}
//       <button
//         className="lg:hidden text-[#13162D] p-2 rounded-md fixed top-4 left-4 z-50"
//         onClick={toggleSidebar}
//         aria-label={isSidebarOpen ? "Close Menu" : "Open Menu"}
//       >
//         {!isSidebarOpen && <HiOutlineMenu size={24} />}
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 h-full bg-[#13162D] text-[#FAF4F4] w-56 transition-transform transform ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:translate-x-0 flex flex-col pt-[6px]  pl-3 z-40`}
//       >
//         {/* Sidebar Logo */}
//         <div className="p-4 border-b border-gray-700 flex justify-start">
//           <img src={Logo1} alt="Logo" className="w-36 md:w-36 lg:w-40 h-auto" />
//         </div>

//         {/* Menu Items */}
//         <motion.nav className="mt-12 flex-grow flex flex-col justify-between">
//           <motion.ul
//             className="space-y-2"
//             initial="hidden"
//             animate="visible"
//             variants={{
//               visible: {
//                 transition: {
//                   staggerChildren: 0.1,
//                 },
//               },
//             }}
//           >
//             {menuItems.map((item, index) => (
//               <motion.li key={index} variants={itemVariants}>
//                 <button
//                   className={`flex items-center w-full p-2 rounded-md hover:bg-gray-800 ${
//                     location.pathname === item.to ? "bg-gray-800" : ""
//                   }`}
//                   onClick={() => handleNavigation(item.to)}
//                 >
//                   <img
//                     src={
//                       location.pathname === item.to
//                         ? item.activeIcon
//                         : item.icon
//                     }
//                     alt={`${item.label} icon`}
//                     className="w-5 h-5 mr-3"
//                   />
//                   <span
//                     className={`text-base ${
//                       location.pathname === item.to ? "text-bulb-yellow" : ""
//                     }`}
//                   >
//                     {item.label}
//                   </span>
//                 </button>
//               </motion.li>
//             ))}
//             {/* {menuItems.map((item, index) => (
//               <motion.li key={index} variants={itemVariants}>
//                 {item.children ? (
//                   <>
//                     <button
//                       className={`flex items-center w-full p-2 rounded-md hover:bg-gray-800 ${
//                         isEditorOpen ? "bg-gray-800" : ""
//                       }`}
//                       onClick={toggleEditorDropdown}
//                     >
//                       <img
//                         src={item.icon}
//                         alt={`${item.label} icon`}
//                         className="w-5 h-5 mr-3"
//                       />
//                       <span className="text-base">{item.label}</span>
//                     </button>
//                     {isEditorOpen && (
//                       <ul className="pl-6">
//                         {item.children.map((child, childIndex) => (
//                           <motion.li key={childIndex} variants={itemVariants}>
//                             <button
//                               className={`flex items-center w-full p-2 rounded-md hover:bg-gray-800 ${
//                                 location.pathname === child.to
//                                   ? "bg-gray-800"
//                                   : ""
//                               }`}
//                               onClick={() => handleNavigation(child.to)}
//                             >
//                               <span
//                                 className={`text-base ${
//                                   location.pathname === child.to
//                                     ? "text-bulb-yellow"
//                                     : ""
//                                 }`}
//                               >
//                                 {child.label}
//                               </span>
//                             </button>
//                           </motion.li>
//                         ))}
//                       </ul>
//                     )}
//                   </>
//                 ) : (
//                   <button
//                     className={`flex items-center w-full p-2 rounded-md hover:bg-gray-800 ${
//                       location.pathname === item.to ? "bg-gray-800" : ""
//                     }`}
//                     onClick={() => handleNavigation(item.to)}
//                   >
//                     <img
//                       src={
//                         location.pathname === item.to
//                           ? item.activeIcon
//                           : item.icon
//                       }
//                       alt={`${item.label} icon`}
//                       className="w-5 h-5 mr-3"
//                     />
//                     <span
//                       className={`text-base ${
//                         location.pathname === item.to ? "text-bulb-yellow" : ""
//                       }`}
//                     >
//                       {item.label}
//                     </span>
//                   </button>
//                 )}
//               </motion.li>
//             ))} */}

//             <hr className="border-t border-gray-700 py-[5rem]" />

//             <div className="mt-auto text-[#FAF4F4]">
//               {lastMenuItems.map((item, index) => (
//                 <motion.li key={index} variants={itemVariants}>
//                   <button
//                     className={`flex items-center w-full p-2 rounded-md hover:bg-gray-800 ${
//                       item.to === null && "text-[#FAF4F4]"
//                     } ${location.pathname === item.to ? "bg-gray-800" : ""}`}
//                     onClick={item.onClick || (() => handleNavigation(item.to))}
//                   >
//                     <img
//                       src={
//                         location.pathname === item.to
//                           ? item.activeIcon
//                           : item.icon
//                       }
//                       alt={`${item.label} icon`}
//                       className="w-5 h-5 mr-3"
//                     />
//                     <span
//                       className={`text-base ${
//                         location.pathname === item.to ? "text-yellow-400" : ""
//                       }`}
//                     >
//                       {item.label}
//                     </span>
//                   </button>
//                 </motion.li>
//               ))}
//             </div>
//           </motion.ul>
//         </motion.nav>
//       </aside>
//     </div>
//   );
// };

// export default Sidebar;
