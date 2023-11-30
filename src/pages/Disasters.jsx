import React, { useEffect, useState } from "react";
import apiConnector from "../services/apiConnector";
import { disasterEndPoints } from "../services/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import DisasterComponent from "../components/DisasterComponent";

const Disasters = () => {
  const [disasters, setDisasters] = useState([]);
  const [filteredDisasters, setFilteredDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [severityFilter, setSeverityFilter] = useState(""); // Severity filter
  const [stateFilter, setStateFilter] = useState(""); // State filter
  const [statusFilter, setStatusFilter] = useState(""); // Status filter
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiConnector({
          method: "GET",
          url: disasterEndPoints.FETCH_ALL_DISASTERS_API,
        });

        setDisasters(response.disasters);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching disasters");
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter disasters based on severity, state, and status
    let filtered = disasters;

    if (severityFilter) {
      filtered = filtered.filter(
        (disaster) =>
          disaster.severity.toLowerCase() === severityFilter.toLowerCase()
      );
    }

    if (stateFilter) {
      filtered = filtered.filter(
        (disaster) =>
          disaster.contact.address.state.toLowerCase() ===
          stateFilter.toLowerCase()
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(
        (disaster) =>
          disaster.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredDisasters(filtered);
  }, [severityFilter, stateFilter, statusFilter, disasters]);

  const handleDetailsClick = (disasterId) => {
    // Navigate to the disaster details page with the disaster ID as a param
    navigate(`/disaster/${disasterId}`);
  };

  if(loading){
    return (
      <div className="spinner w-full flex items-center justify-center"></div>
    );
  }

  const statesOfIndia = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  return (
    <div className="w-full bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-11/12 flex flex-col items-center justify-center">
        <h2 className="md:text-5xl sm:text-3xl text-center mt-6 font-bold mb-6 overflow-hidden text-indigo-600">
          Disaster Events
        </h2>
        <div className="w-6/12">
          <Link to="/addDisaster">
            <button className="bg-indigo-500 w-full hover:bg-indigo-600 transition-all duration-200 text-white font-semibold py-2 px-4 rounded-full">
              Add Disaster
            </button>
          </Link>
        </div>
        {/* Search bar */}
        <div className="w-8/12 mt-6 mb-4">
          <label className="block text-indigo-600 font-bold mb-2">
            Search:
          </label>
          <input
            type="text"
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Search any Disaster Info...."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="w-8/12 gap-x-6 flex justify-between">
          <div className="w-1/3">
            <label className="block text-indigo-600 font-bold mb-2">
              Severity:
            </label>
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setSeverityFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="w-1/3">
            <label className="block text-indigo-600 font-bold mb-2">
              State:
            </label>
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setStateFilter(e.target.value)}
            >
              <option value="">All</option>
              {statesOfIndia.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/3">
            <label className="block text-indigo-600 font-bold mb-2">
              Status:
            </label>
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* List of disasters */}
        <div className="w-full">
          <div className="grid grid-cols-1 mb-20 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {filteredDisasters
              .filter((disaster) =>
                // Case-insensitive search
                disaster.typeOfDisaster
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((disaster) => (
                <div className="ml-10 w-full" key={disaster._id}>
                  <DisasterComponent disaster={disaster} loading={loading} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disasters;
