import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFilter } from "react-icons/fa"; // Importing filter icon from react-icons

const BASE_URL = "http://localhost:5000"; // Assuming this is your API base URL

const FilterComponent = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    timeRange: "all",
    formType: "all",
    status: "all",
    name: "",
    email: "",
    contact: "",
    complaintCategory: "all",
    serviceUsed: "all",
    satisfactionLevel: "all",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formTypes, setFormTypes] = useState([]);
  const [complaintCategories, setComplaintCategories] = useState([]);
  const [servicesUsed, setServicesUsed] = useState([]);
  const [satisfactionLevels, setSatisfactionLevels] = useState([]);

  useEffect(() => {
    const fetchDynamicOptions = async () => {
      try {
        // Fetch unique form types
        const formTypesResponse = await axios.get(`${BASE_URL}/formEvents`);
        setFormTypes([
          "all",
          ...new Set(formTypesResponse.data.map((event) => event.formType)),
        ]);

        // Fetch unique complaint categories and services used from complaint form responses
        const complaintResponses = await axios.get(
          `${BASE_URL}/responses?formType=complaint`
        );
        const uniqueCategories = new Set(
          complaintResponses.data.flatMap(
            (response) =>
              response.data.find((field) => field.id === "1")?.value || []
          )
        );
        const uniqueServices = new Set(
          complaintResponses.data.flatMap(
            (response) =>
              response.data.find((field) => field.id === "2")?.value || []
          )
        );
        setComplaintCategories(["all", ...uniqueCategories]);
        setServicesUsed(["all", ...uniqueServices]);

        // Fetch unique satisfaction levels from event form responses
        const eventResponses = await axios.get(
          `${BASE_URL}/responses?formType=event`
        );
        const uniqueSatisfaction = new Set(
          eventResponses.data.flatMap(
            (response) =>
              response.data.find((field) => field.id === "1738326821914")
                ?.value || []
          )
        );
        setSatisfactionLevels(["all", ...uniqueSatisfaction]);
      } catch (error) {
        console.error("Error fetching dynamic filter options:", error);
      }
    };

    fetchDynamicOptions();
  }, []);

  const timeRangeOptions = [
    { value: "all", label: "All Time" },
    { value: "lastWeek", label: "Last Week" },
    { value: "lastMonth", label: "Last Month" },
    { value: "lastYear", label: "Last Year" },
  ];

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "unresolved", label: "Unresolved" },
    { value: "resolved", label: "Resolved" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    onFilterChange({ ...filters, [name]: value });
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="p-2 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <FaFilter size={20} />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-10">
          <div className="flex flex-col gap-4">
            {/* Time Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Range
              </label>
              <select
                name="timeRange"
                value={filters.timeRange}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {timeRangeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Form Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Form Type
              </label>
              <select
                name="formType"
                value={filters.formType}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {formTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Forms" : type}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={filters.status}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Name Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={filters.name}
                onChange={handleChange}
                placeholder="Search by name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Email Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={filters.email}
                onChange={handleChange}
                placeholder="Search by email"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Contact Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact
              </label>
              <input
                type="text"
                name="contact"
                value={filters.contact}
                onChange={handleChange}
                placeholder="Search by contact"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Complaint Category Filter - only show for complaint form */}
            {filters.formType === "complaint" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Complaint Category
                </label>
                <select
                  name="complaintCategory"
                  value={filters.complaintCategory}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {complaintCategories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Service Used Filter - only show for complaint form */}
            {filters.formType === "complaint" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Used
                </label>
                <select
                  name="serviceUsed"
                  value={filters.serviceUsed}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {servicesUsed.map((service) => (
                    <option key={service} value={service}>
                      {service === "all" ? "All Services" : service}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Satisfaction Level Filter - only show for event form */}
            {filters.formType === "event" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Satisfaction Level
                </label>
                <select
                  name="satisfactionLevel"
                  value={filters.satisfactionLevel}
                  onChange={handleChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {satisfactionLevels.map((level) => (
                    <option key={level} value={level}>
                      {level === "all" ? "All Levels" : level}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
