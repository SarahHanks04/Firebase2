import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "../../assets/Icons/SearchIcon.svg";
import { X } from "lucide-react";
import { setSearchTerm } from "../../redux/Slices/SearchSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      dispatch(setSearchTerm(searchInput));
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchInput, dispatch]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleClearInput = () => {
    setSearchInput("");
    dispatch(setSearchTerm(""));
  };

  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md">
      <input
        type="text"
        value={searchInput}
        placeholder="Search"
        className="w-full outline-none bg-transparent text-gray-600 text-sm"
        onChange={handleInputChange}
      />
      {/* Show the X icon only when there is text in the input */}
      {searchInput && (
        <button
          type="button"
          onClick={handleClearInput}
          className="ml-2 text-red-500 hover:text-red-700"
        >
          <X className="w-3 h-3" />
        </button>
      )}
      {/* Show the search icon only when there is no text in the input */}
      {!searchInput && (
        <button type="button" className="ml-2">
          <img
            src={SearchIcon}
            alt="Search"
            className="w-5 h-5 text-gray-400"
          />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import SearchIcon from "../../assets/Icons/SearchIcon.svg";
// import { setSearchTerm } from "../../redux/Slices/SearchSlice";

// const SearchBar = () => {
//   const dispatch = useDispatch();
//   const [searchInput, setSearchInput] = useState("");

//   useEffect(() => {
//     const debounceTimer = setTimeout(() => {
//       dispatch(setSearchTerm(searchInput));
//     }, 300);

//     return () => clearTimeout(debounceTimer);
//   }, [searchInput, dispatch]);

//   const handleInputChange = (e) => {
//     setSearchInput(e.target.value);
//   };

//   return (
//     <div className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md">
//       <input
//         type="text"
//         value={searchInput}
//         placeholder="Search"
//         className="w-full outline-none bg-transparent text-gray-600 text-sm"
//         onChange={handleInputChange}
//       />
//       <button type="button" className="ml-2">
//         <img src={SearchIcon} alt="Search" className="w-5 h-5 text-gray-400" />
//       </button>
//     </div>
//   );
// };

// export default SearchBar;
