import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, User2 } from "lucide-react";
import {
  uploadProfileImage,
  fetchProfile,
} from "../../redux/Slices/ProfileSlice";
import ImageEditor from "./ImageEditor";

const ProfileImage = () => {
  const dispatch = useDispatch();
  const { profileImage, personalInfo } = useSelector((state) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setIsEditing(true);
    }
  };

  const handleSave = (croppedImage) => {
    dispatch(uploadProfileImage(croppedImage));
    setIsEditing(false);
  };

  return (
    <section className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-8 p-4 rounded shadow-md border border-gray-300 bg-bulb-white relative">
      {/* Profile Image */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex justify-center items-center bg-gray-200 overflow-hidden mb-4 sm:mb-0 cursor-pointer">
        {profileImage === "User2" ? (
          <User2 size={40} color="#4A4848" />
        ) : (
          <div className="w-full h-full overflow-hidden relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover absolute top-0 left-0"
            />
          </div>
        )}
        <input
          type="file"
          onChange={handleUpload}
          ref={fileInputRef}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>

      {/* Edit Button */}
      <button
        onClick={() => fileInputRef.current.click()}
        className="absolute bottom-5 left-[4px] transform -translate-x-1/2 translate-y-1/2 bg-bulb-lightBlue rounded-[4px] px-[8px] py-[4px] gap-1 text-[12px] shadow-md flex items-center justify-center"
      >
        <Pencil size={14} color="#4A4848" />
        Edit
      </button>

      {/* Profile Details */}
      <div className="text-center sm:text-left">
        <h2 className="text-lg font-semibold text-[#000000]">
          {personalInfo?.firstName || "Full Name"}{" "}
          {personalInfo?.lastName || ""}
        </h2>
        <p className="text-sm text-[#4A4848]">
          {personalInfo?.role || "Community Manager"}
        </p>
      </div>

      {/* Image Editor Popup */}
      {isEditing && (
        <ImageEditor
          image={selectedImage}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </section>
  );
};

export default ProfileImage;


// WITH FIREBASE
// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Pencil, User2 } from "lucide-react";
// import { uploadProfileImage, fetchProfile } from "@/redux/Slices/ProfileSlice";
// import ImageEditor from "./ImageEditor";

// const ProfileImage = () => {
//   const dispatch = useDispatch();
//   const { profileImage, personalInfo } = useSelector((state) => state.profile);
//   const [isEditing, setIsEditing] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     dispatch(fetchProfile());
//   }, [dispatch]);

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       setIsEditing(true);
//     }
//   };

//   const handleSave = (croppedImage) => {
//     dispatch(uploadProfileImage(croppedImage));
//     setIsEditing(false);
//   };

//   return (
//     <section className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-8 p-4 rounded shadow-md border border-gray-300 bg-bulb-white relative">
//       {/* Profile Image */}
//       <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex justify-center items-center bg-gray-200 overflow-hidden mb-4 sm:mb-0 cursor-pointer">
//         {profileImage === "User2" ? (
//           <User2 size={40} color="#4A4848" />
//         ) : (
//           <img
//             src={profileImage}
//             alt="Profile"
//             className="w-full h-full object-cover"
//           />
//         )}
//         <input
//           type="file"
//           onChange={handleUpload}
//           ref={fileInputRef}
//           className="absolute inset-0 opacity-0 cursor-pointer"
//         />
//       </div>

//       {/* Edit Button */}
//       <button
//         onClick={() => fileInputRef.current.click()}
//         className="absolute bottom-5 left-[4px] transform -translate-x-1/2 translate-y-1/2 bg-bulb-lightBlue rounded-[4px] px-[8px] py-[4px] gap-1 text-[12px] shadow-md flex items-center justify-center"
//       >
//         <Pencil size={14} color="#4A4848" />
//         Edit
//       </button>

//       {/* Profile Details */}
//       <div className="text-center sm:text-left">
//         <h2 className="text-lg font-semibold text-[#000000]">
//           {personalInfo?.firstName || "Full Name"}{" "}
//           {personalInfo?.lastName || ""}
//         </h2>
//         <p className="text-sm text-[#4A4848]">
//           {personalInfo?.role || "Community Manager"}
//         </p>
//       </div>

//       {/* Image Editor Popup */}
//       {isEditing && (
//         <ImageEditor
//           image={selectedImage}
//           onSave={handleSave}
//           onCancel={() => setIsEditing(false)}
//         />
//       )}
//     </section>
//   );
// };

// export default ProfileImage;