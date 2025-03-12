import { Heart, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import Message from "../../../assets/Icons/Message.svg";
import Expand from "../../../assets/Icons/Expand.svg";
import { jsPDF } from "jspdf";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const RecentComment = ({ response }) => {
  const searchTerm = useSelector((state) => state.search.term);

  // Message functionality
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [savedMessages, setSavedMessages] = useState([]);

  // Like functionality
  const [isLiked, setIsLiked] = useState(false);

  // Load saved messages and like status from localStorage
  useEffect(() => {
    const storedMessages = localStorage.getItem(`messages_${response.id}`);
    if (storedMessages) {
      setSavedMessages(JSON.parse(storedMessages));
    }
    const likedStatus = localStorage.getItem(`isLiked_${response.id}`);
    if (likedStatus) {
      setIsLiked(JSON.parse(likedStatus));
    }
  }, [response.id]);

  // Save message to localStorage
  const handleSaveMessage = () => {
    if (messageText.trim()) {
      const newMessageList = [...savedMessages, messageText];
      setSavedMessages(newMessageList);
      localStorage.setItem(
        `messages_${response.id}`,
        JSON.stringify(newMessageList)
      );
      setMessageText("");
      setMessageOpen(false);
    }
  };

  // Delete message from localStorage
  const handleDeleteMessage = (index) => {
    const newMessageList = savedMessages.filter((_, i) => i !== index);
    setSavedMessages(newMessageList);
    localStorage.setItem(
      `messages_${response.id}`,
      JSON.stringify(newMessageList)
    );
  };

  // Like functionality
  const handleLike = () => {
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    localStorage.setItem(
      `isLiked_${response.id}`,
      JSON.stringify(newLikeStatus)
    );
  };

  // Download functionality (PDF)
  const handleDownload = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Response Details", 10, 10);

    // Add response data
    doc.setFontSize(12);
    let yOffset = 20;

    // Add name
    const fullName = getFullName(response);
    doc.text(`Name: ${fullName}`, 10, yOffset);
    yOffset += 10;

    // Add submission date
    const submissionDate = new Date(response.submissionDate).toLocaleString();
    doc.text(`Submission Date: ${submissionDate}`, 10, yOffset);
    yOffset += 10;

    // Add form type
    doc.text(`Form Type: ${response.formType}`, 10, yOffset);
    yOffset += 10;

    // Add message or feedback
    const messageData = response.data.find((item) => item.type === "textarea");
    doc.text(`Message: ${messageData?.value || "No message"}`, 10, yOffset);
    yOffset += 10;

    // Add saved messages (if any)
    if (savedMessages.length > 0) {
      doc.text("Saved Messages:", 10, yOffset);
      yOffset += 10;
      savedMessages.forEach((msg, index) => {
        doc.text(`${index + 1}. ${msg}`, 15, yOffset);
        yOffset += 10;
      });
    }

    // Save the PDF
    doc.save(`response_${response.id}.pdf`);

    // Copy link to clipboard
    const link = `${window.location.origin}/response/${response.id}`;
    navigator.clipboard.writeText(link).then(() => {
      toast.success("Link copied to clipboard!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
  };

  // Helper function to get full name
  const getFullName = (response) => {
    let nameData = response.data.find((item) => item.label === "Name");
    let firstNameData = response.data.find(
      (item) =>
        item.label.toLowerCase() === "firstname" ||
        item.label.toLowerCase() === "first name"
    );
    let lastNameData = response.data.find(
      (item) =>
        item.label.toLowerCase() === "lastname" ||
        item.label.toLowerCase() === "last name"
    );

    if (nameData) {
      return nameData.value;
    } else if (firstNameData && lastNameData) {
      return `${firstNameData.value || ""} ${lastNameData.value || ""}`.trim();
    } else if (firstNameData) {
      return firstNameData.value || "Anonymous";
    } else if (lastNameData) {
      return lastNameData.value || "Anonymous";
    } else {
      return "Anonymous";
    }
  };

  // Filter responses based on search term
  const shouldDisplay = () => {
    if (!searchTerm) return true;

    const searchTermLower = searchTerm.toLowerCase();

    // Search by name
    const fullName = getFullName(response).toLowerCase();
    if (fullName.includes(searchTermLower)) return true;

    // Search by form type
    const formType = response.formType.toLowerCase();
    if (formType.includes(searchTermLower)) return true;

    // Search by date
    const submissionDate = new Date(response.submissionDate);
    const dateString = submissionDate.toLocaleDateString();
    if (dateString.includes(searchTermLower)) return true;

    // Search by month
    const month = submissionDate.toLocaleString("default", { month: "long" });
    if (month.toLowerCase().includes(searchTermLower)) return true;

    // Search by year
    const year = submissionDate.getFullYear().toString();
    if (year.includes(searchTermLower)) return true;

    // Search by day
    const day = submissionDate.getDate().toString();
    if (day.includes(searchTermLower)) return true;

    return false;
  };

  if (!shouldDisplay()) return null;

  // Check if response.data exists before calling find
  if (!response.data) {
    console.error("No data found for response with id:", response.id);
    return null;
  }

  // Extract name information
  let nameData = response.data.find((item) => item.label === "Name");
  let firstNameData = response.data.find(
    (item) =>
      item.label.toLowerCase() === "firstname" ||
      item.label.toLowerCase() === "first name"
  );
  let lastNameData = response.data.find(
    (item) =>
      item.label.toLowerCase() === "lastname" ||
      item.label.toLowerCase() === "last name"
  );

  let initials;
  let fullName;

  if (nameData) {
    fullName = nameData.value;
    const nameParts = nameData.value.split(" ");
    if (nameParts.length > 1) {
      initials = `${nameParts[0][0]?.toUpperCase() || ""}${
        nameParts[nameParts.length - 1][0]?.toUpperCase() || ""
      }`;
    } else {
      initials = nameData.value.slice(0, 2)?.toUpperCase() || "AN";
    }
  } else if (firstNameData && lastNameData) {
    fullName = `${firstNameData.value || ""} ${
      lastNameData.value || ""
    }`.trim();
    initials = `${firstNameData.value?.charAt(0)?.toUpperCase() || ""}${
      lastNameData.value?.charAt(0)?.toUpperCase() || ""
    }`;
    if (initials.length === 0) initials = "AN";
  } else if (firstNameData) {
    fullName = firstNameData.value || "Anonymous";
    initials = (firstNameData.value || "Anonymous").slice(0, 2).toUpperCase();
  } else if (lastNameData) {
    fullName = lastNameData.value || "Anonymous";
    initials = (lastNameData.value || "Anonymous").slice(0, 2).toUpperCase();
  } else {
    fullName = "Anonymous";
    initials = "AN";
  }

  // Find location or type of response
  const locationOrType = response.formType || "Unknown";

  // Find the message or feedback from the response with type textarea
  const messageData = response.data.find((item) => item.type === "textarea");

  // Calculate time difference in human-readable format
  const submissionDate = new Date(response.submissionDate);
  const now = new Date();
  const diffInMs = now - submissionDate;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  let timeAgo;
  if (diffInDays > 0) {
    timeAgo = `${diffInDays} days ago`;
  } else {
    timeAgo = `${diffInHours} hr${diffInHours !== 1 ? "s" : ""} ago`;
  }

  return (
    <section className="border-b-[1.4px] border-gray-300 pb-6 pt-2">
      <div className="flex items-start space-x-4 p-2">
        {/* Avatar */}
        <div className="w-12 h-12 flex items-center justify-center bg-bulb-blue text-bulb-yellow rounded-full text-xl font-bold shadow-md">
          {initials}
        </div>

        {/* Comment Details */}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h2 className="text-[16px] font-semibold text-gray-800">
              {fullName === "" ? "Anonymous" : fullName}
            </h2>
            <span className="text-[12px] text-gray-500">{timeAgo}</span>
          </div>
          <div className="text-sm text-gray-500">
            on {locationOrType} - #{response.id}
          </div>

          {/* Saved Messages */}
          {savedMessages.map((msg, index) => (
            <div
              key={index}
              className="bg-bulb-white p-2 rounded-md mt-2 flex justify-between items-center"
            >
              <p className="text-[13px] text-gray-700">{msg}</p>
              <button
                onClick={() => handleDeleteMessage(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          ))}

          {/* Message Input */}
          {messageOpen && (
            <div className="mt-4">
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full p-3 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-bulb-yellow"
                placeholder="Write a message..."
              />
              <div className="flex justify-between mt-2">
                <button
                  onClick={handleSaveMessage}
                  className="px-3 py-1 bg-bulb-success text-bulb-white text-[10px] rounded-[8px]"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Feedback Message */}
          <p className="mt-2 text-[13px] text-gray-700">
            {messageData?.value || "No message"}
          </p>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-evenly space-x-4 mt-3">
        <button
          onClick={() => setMessageOpen(!messageOpen)}
          className="text-gray-500"
        >
          <img src={Message} alt="Message Icon" size={16} />
        </button>
        <button
          onClick={handleLike}
          className={`text-${isLiked ? "red" : "black"}-500`}
        >
          <Heart size={16} fill={isLiked ? "red" : "none"} />
        </button>
        <button onClick={handleDownload} className="text-gray-500">
          <img src={Expand} alt="Download Icon" size={16} />
        </button>
      </div>
    </section>
  );
};

export default RecentComment;

// WITH COPY LINK

// import { Heart, X } from "lucide-react";
// import React, { useState, useEffect } from "react";
// import Message from "../../../assets/Icons/Message.svg";
// import Expand from "../../../assets/Icons/Expand.svg";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";

// const RecentComment = ({ response }) => {
//   const searchTerm = useSelector((state) => state.search.term);

//   // Message functionality
//   const [messageOpen, setMessageOpen] = useState(false);
//   const [messageText, setMessageText] = useState("");
//   const [savedMessages, setSavedMessages] = useState([]);

//   // Like functionality
//   const [isLiked, setIsLiked] = useState(false);

//   // Load saved messages and like status from localStorage
//   useEffect(() => {
//     const storedMessages = localStorage.getItem(`messages_${response.id}`);
//     if (storedMessages) {
//       setSavedMessages(JSON.parse(storedMessages));
//     }
//     const likedStatus = localStorage.getItem(`isLiked_${response.id}`);
//     if (likedStatus) {
//       setIsLiked(JSON.parse(likedStatus));
//     }
//   }, [response.id]);

//   // Save message to localStorage
//   const handleSaveMessage = () => {
//     if (messageText.trim()) {
//       const newMessageList = [...savedMessages, messageText];
//       setSavedMessages(newMessageList);
//       localStorage.setItem(
//         `messages_${response.id}`,
//         JSON.stringify(newMessageList)
//       );
//       setMessageText("");
//       setMessageOpen(false);
//     }
//   };

//   // Delete message from localStorage
//   const handleDeleteMessage = (index) => {
//     const newMessageList = savedMessages.filter((_, i) => i !== index);
//     setSavedMessages(newMessageList);
//     localStorage.setItem(
//       `messages_${response.id}`,
//       JSON.stringify(newMessageList)
//     );
//   };

//   // Like functionality
//   const handleLike = () => {
//     const newLikeStatus = !isLiked;
//     setIsLiked(newLikeStatus);
//     localStorage.setItem(
//       `isLiked_${response.id}`,
//       JSON.stringify(newLikeStatus)
//     );
//   };

//   // Copy link functionality
//   const handleCopyLink = () => {
//     const link = `${window.location.origin}/response/${response.id}`;
//     navigator.clipboard.writeText(link).then(() => {
//       toast.success("Link copied to clipboard!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//     });
//   };

//   // Helper function to get full name
//   const getFullName = (response) => {
//     let nameData = response.data.find((item) => item.label === "Name");
//     let firstNameData = response.data.find(
//       (item) =>
//         item.label.toLowerCase() === "firstname" ||
//         item.label.toLowerCase() === "first name"
//     );
//     let lastNameData = response.data.find(
//       (item) =>
//         item.label.toLowerCase() === "lastname" ||
//         item.label.toLowerCase() === "last name"
//     );

//     if (nameData) {
//       return nameData.value;
//     } else if (firstNameData && lastNameData) {
//       return `${firstNameData.value || ""} ${lastNameData.value || ""}`.trim();
//     } else if (firstNameData) {
//       return firstNameData.value || "Anonymous";
//     } else if (lastNameData) {
//       return lastNameData.value || "Anonymous";
//     } else {
//       return "Anonymous";
//     }
//   };

//   // Filter responses based on search term
//   const shouldDisplay = () => {
//     if (!searchTerm) return true;

//     const searchTermLower = searchTerm.toLowerCase();

//     // Search by name
//     const fullName = getFullName(response).toLowerCase();
//     if (fullName.includes(searchTermLower)) return true;

//     // Search by form type
//     const formType = response.formType.toLowerCase();
//     if (formType.includes(searchTermLower)) return true;

//     // Search by date
//     const submissionDate = new Date(response.submissionDate);
//     const dateString = submissionDate.toLocaleDateString();
//     if (dateString.includes(searchTermLower)) return true;

//     // Search by month
//     const month = submissionDate.toLocaleString("default", { month: "long" });
//     if (month.toLowerCase().includes(searchTermLower)) return true;

//     // Search by year
//     const year = submissionDate.getFullYear().toString();
//     if (year.includes(searchTermLower)) return true;

//     // Search by day
//     const day = submissionDate.getDate().toString();
//     if (day.includes(searchTermLower)) return true;

//     return false;
//   };

//   if (!shouldDisplay()) return null;

//   // Check if response.data exists before calling find
//   if (!response.data) {
//     console.error("No data found for response with id:", response.id);
//     return null;
//   }

//   // Extract name information
//   let nameData = response.data.find((item) => item.label === "Name");
//   let firstNameData = response.data.find(
//     (item) =>
//       item.label.toLowerCase() === "firstname" ||
//       item.label.toLowerCase() === "first name"
//   );
//   let lastNameData = response.data.find(
//     (item) =>
//       item.label.toLowerCase() === "lastname" ||
//       item.label.toLowerCase() === "last name"
//   );

//   let initials;
//   let fullName;

//   if (nameData) {
//     fullName = nameData.value;
//     const nameParts = nameData.value.split(" ");
//     if (nameParts.length > 1) {
//       initials = `${nameParts[0][0]?.toUpperCase() || ""}${
//         nameParts[nameParts.length - 1][0]?.toUpperCase() || ""
//       }`;
//     } else {
//       initials = nameData.value.slice(0, 2)?.toUpperCase() || "AN";
//     }
//   } else if (firstNameData && lastNameData) {
//     fullName = `${firstNameData.value || ""} ${
//       lastNameData.value || ""
//     }`.trim();
//     initials = `${firstNameData.value?.charAt(0)?.toUpperCase() || ""}${
//       lastNameData.value?.charAt(0)?.toUpperCase() || ""
//     }`;
//     if (initials.length === 0) initials = "AN";
//   } else if (firstNameData) {
//     fullName = firstNameData.value || "Anonymous";
//     initials = (firstNameData.value || "Anonymous").slice(0, 2).toUpperCase();
//   } else if (lastNameData) {
//     fullName = lastNameData.value || "Anonymous";
//     initials = (lastNameData.value || "Anonymous").slice(0, 2).toUpperCase();
//   } else {
//     fullName = "Anonymous";
//     initials = "AN";
//   }

//   // Find location or type of response
//   const locationOrType = response.formType || "Unknown";

//   // Find the message or feedback from the response with type textarea
//   const messageData = response.data.find((item) => item.type === "textarea");

//   // Calculate time difference in human-readable format
//   const submissionDate = new Date(response.submissionDate);
//   const now = new Date();
//   const diffInMs = now - submissionDate;
//   const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
//   const diffInDays = Math.floor(diffInHours / 24);

//   let timeAgo;
//   if (diffInDays > 0) {
//     timeAgo = `${diffInDays} days ago`;
//   } else {
//     timeAgo = `${diffInHours} hr${diffInHours !== 1 ? "s" : ""} ago`;
//   }

//   return (
//     <section className="border-b-[1.4px] border-gray-300 pb-6 pt-2">
//       <div className="flex items-start space-x-4 p-2">
//         {/* Avatar */}
//         <div className="w-12 h-12 flex items-center justify-center bg-bulb-blue text-bulb-yellow rounded-full text-xl font-bold shadow-md">
//           {initials}
//         </div>

//         {/* Comment Details */}
//         <div className="flex-1">
//           <div className="flex justify-between items-center">
//             <h2 className="text-[16px] font-semibold text-gray-800">
//               {fullName === "" ? "Anonymous" : fullName}
//             </h2>
//             <span className="text-[12px] text-gray-500">{timeAgo}</span>
//           </div>
//           <div className="text-sm text-gray-500">
//             on {locationOrType} - #{response.id}
//           </div>

//           {/* Saved Messages */}
//           {savedMessages.map((msg, index) => (
//             <div
//               key={index}
//               className="bg-bulb-white p-2 rounded-md mt-2 flex justify-between items-center"
//             >
//               <p className="text-[13px] text-gray-700">{msg}</p>
//               <button
//                 onClick={() => handleDeleteMessage(index)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 <X size={16} />
//               </button>
//             </div>
//           ))}

//           {/* Message Input */}
//           {messageOpen && (
//             <div className="mt-4">
//               <textarea
//                 value={messageText}
//                 onChange={(e) => setMessageText(e.target.value)}
//                 className="w-full p-3 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-bulb-yellow"
//                 placeholder="Write a message..."
//               />
//               <div className="flex justify-between mt-2">
//                 <button
//                   onClick={handleSaveMessage}
//                   className="px-3 py-1 bg-bulb-success text-bulb-white text-[10px] rounded-[8px]"
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Feedback Message */}
//           <p className="mt-2 text-[13px] text-gray-700">
//             {messageData?.value || "No message"}
//           </p>
//         </div>
//       </div>
//       {/* Action Buttons */}
//       <div className="flex justify-evenly space-x-4 mt-3">
//         <button
//           onClick={() => setMessageOpen(!messageOpen)}
//           className="text-gray-500"
//         >
//           <img src={Message} alt="Message Icon" size={16} />
//         </button>
//         <button
//           onClick={handleLike}
//           className={`text-${isLiked ? "red" : "black"}-500`}
//         >
//           <Heart size={16} fill={isLiked ? "red" : "none"} />
//         </button>
//         <button onClick={handleCopyLink} className="text-gray-500">
//           <img src={Expand} alt="Copy Link Icon" size={16} />
//         </button>
//       </div>
//     </section>
//   );
// };

// export default RecentComment;

// import { X } from "lucide-react";
// import React, { useState, useEffect } from "react";
// import Message from "../../../assets/Icons/Message.svg";
// import Expand from "../../../assets/Icons/Expand.svg";
// import WishIcon from "../../../assets/Icons/WishIcon.svg";
// import classNames from "classnames";
// import { jsPDF } from "jspdf";

// const RecentComment = ({ response }) => {
//   // Message functionality
//   const [messageOpen, setMessageOpen] = useState(false);
//   const [messageText, setMessageText] = useState("");
//   const [savedMessages, setSavedMessages] = useState([]);

//   // Like functionality
//   const [isLiked, setIsLiked] = useState(false);

//   // Load saved messages and like status from localStorage
//   useEffect(() => {
//     const storedMessages = localStorage.getItem(`messages_${response.id}`);
//     if (storedMessages) {
//       setSavedMessages(JSON.parse(storedMessages));
//     }
//     const likedStatus = localStorage.getItem(`isLiked_${response.id}`);
//     if (likedStatus) {
//       setIsLiked(JSON.parse(likedStatus));
//     }
//   }, [response.id]);

//   // Save message to localStorage
//   const handleSaveMessage = () => {
//     if (messageText.trim()) {
//       const newMessageList = [...savedMessages, messageText];
//       setSavedMessages(newMessageList);
//       localStorage.setItem(
//         `messages_${response.id}`,
//         JSON.stringify(newMessageList)
//       );
//       setMessageText("");
//       setMessageOpen(false);
//     }
//   };

//   // Delete message from localStorage
//   const handleDeleteMessage = (index) => {
//     const newMessageList = savedMessages.filter((_, i) => i !== index);
//     setSavedMessages(newMessageList);
//     localStorage.setItem(
//       `messages_${response.id}`,
//       JSON.stringify(newMessageList)
//     );
//   };

//   // Like functionality
//   const handleLike = () => {
//     const newLikeStatus = !isLiked;
//     setIsLiked(newLikeStatus);
//     localStorage.setItem(
//       `isLiked_${response.id}`,
//       JSON.stringify(newLikeStatus)
//     );
//   };

//   // Download functionality (PDF)
//   const handleDownload = () => {
//     const doc = new jsPDF();

//     // Add title
//     doc.setFontSize(18);
//     doc.text("Response Details", 10, 10);

//     // Add response data
//     doc.setFontSize(12);
//     let yOffset = 20;

//     // Add name
//     const fullName = getFullName(response);
//     doc.text(`Name: ${fullName}`, 10, yOffset);
//     yOffset += 10;

//     // Add submission date
//     const submissionDate = new Date(response.submissionDate).toLocaleString();
//     doc.text(`Submission Date: ${submissionDate}`, 10, yOffset);
//     yOffset += 10;

//     // Add form type
//     doc.text(`Form Type: ${response.formType}`, 10, yOffset);
//     yOffset += 10;

//     // Add message or feedback
//     const messageData = response.data.find((item) => item.type === "textarea");
//     doc.text(`Message: ${messageData?.value || "No message"}`, 10, yOffset);
//     yOffset += 10;

//     // Add saved messages (if any)
//     if (savedMessages.length > 0) {
//       doc.text("Saved Messages:", 10, yOffset);
//       yOffset += 10;
//       savedMessages.forEach((msg, index) => {
//         doc.text(`${index + 1}. ${msg}`, 15, yOffset);
//         yOffset += 10;
//       });
//     }

//     // Save the PDF
//     doc.save(`response_${response.id}.pdf`);
//   };

//   // Helper function to get full name
//   const getFullName = (response) => {
//     let nameData = response.data.find((item) => item.label === "Name");
//     let firstNameData = response.data.find(
//       (item) =>
//         item.label.toLowerCase() === "firstname" ||
//         item.label.toLowerCase() === "first name"
//     );
//     let lastNameData = response.data.find(
//       (item) =>
//         item.label.toLowerCase() === "lastname" ||
//         item.label.toLowerCase() === "last name"
//     );

//     if (nameData) {
//       return nameData.value;
//     } else if (firstNameData && lastNameData) {
//       return `${firstNameData.value || ""} ${lastNameData.value || ""}`.trim();
//     } else if (firstNameData) {
//       return firstNameData.value || "Anonymous";
//     } else if (lastNameData) {
//       return lastNameData.value || "Anonymous";
//     } else {
//       return "Anonymous";
//     }
//   };

//   // Check if response.data exists before calling find
//   if (!response.data) {
//     console.error("No data found for response with id:", response.id);
//     return null;
//   }

//   // Extract name information
//   const fullName = getFullName(response);
//   const initials = fullName
//     .split(" ")
//     .map((part) => part[0]?.toUpperCase())
//     .join("")
//     .slice(0, 2);

//   // Find location or type of response
//   const locationOrType = response.formType || "Unknown";

//   // Find the message or feedback from the response with type textarea
//   const messageData = response.data.find((item) => item.type === "textarea");

//   // Calculate time difference in human-readable format
//   const submissionDate = new Date(response.submissionDate);
//   const now = new Date();
//   const diffInMs = now - submissionDate;
//   const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
//   const diffInDays = Math.floor(diffInHours / 24);

//   let timeAgo;
//   if (diffInDays > 0) {
//     timeAgo = `${diffInDays} days ago`;
//   } else {
//     timeAgo = `${diffInHours} hr${diffInHours !== 1 ? "s" : ""} ago`;
//   }

//   return (
//     <section className="border-b border-gray-400 pb-6 pt-2">
//       <div className="flex items-start space-x-4 p-4">
//         {/* Avatar */}
//         <div className="w-12 h-12 flex items-center justify-center bg-bulb-blue text-bulb-yellow rounded-full text-xl font-bold shadow-md">
//           {initials}
//         </div>

//         {/* Comment Details */}
//         <div className="flex-1">
//           <div className="flex justify-between items-center">
//             <h2 className="text-base font-semibold text-gray-800">
//               {fullName === "" ? "Anonymous" : fullName}
//             </h2>
//             <span className="text-sm text-gray-500">{timeAgo}</span>
//           </div>
//           <div className="text-sm text-gray-500">
//             on {locationOrType} - #{response.id}
//           </div>

//           {/* Saved Messages */}
//           {savedMessages.map((msg, index) => (
//             <div
//               key={index}
//               className="bg-bulb-white p-2 rounded-md mt-2 flex justify-between items-center"
//             >
//               <p className="text-sm text-gray-700">{msg}</p>
//               <button
//                 onClick={() => handleDeleteMessage(index)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 <X size={16} />
//               </button>
//             </div>
//           ))}

//           {/* Message Input */}
//           {messageOpen && (
//             <div className="mt-4">
//               <textarea
//                 value={messageText}
//                 onChange={(e) => setMessageText(e.target.value)}
//                 className="w-full p-3 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-bulb-yellow"
//                 placeholder="Write a message..."
//               />
//               <div className="flex justify-between mt-2">
//                 <button
//                   onClick={handleSaveMessage}
//                   className="px-3 py-1 bg-bulb-success text-bulb-white text-[10px] rounded-[8px]"
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Feedback Message */}
//           <p className="mt-2 text-sm text-gray-700">
//             {messageData?.value || "No message"}
//           </p>
//         </div>
//       </div>
//       {/* Action Buttons */}
//       <div className="flex justify-evenly space-x-4 pl-4 mt-3">
//         <button
//           onClick={() => setMessageOpen(!messageOpen)}
//           className="text-gray-500"
//         >
//           <img src={Message} alt="Message Icon" />
//         </button>
//         <button
//           onClick={handleLike}
//           className={classNames("text-gray-500 hover:text-red-500", {
//             "text-red-500": isLiked,
//           })}
//         >
//           <img src={WishIcon} alt="Like icon" />
//         </button>
//         <button onClick={handleDownload} className="text-gray-500">
//           <img src={Expand} alt="Download Icon" />
//         </button>
//       </div>
//     </section>
//   );
// };

// export default RecentComment;
