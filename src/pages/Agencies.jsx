import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAgencies } from "../redux/Actions/agencyAction";
import AgencyComponent from "../components/AgencyComponent";
import * as geolib from "geolib";
import { getAccountInfo } from "../redux/Actions/profileAction"; // Import the getAccountInfo action
import { FiSearch } from "react-icons/fi"; // Import the search icon

const Agencies = () => {
  const agencies = useSelector((state) => state.agencies);
  const agencyInfo = useSelector((state) => state.profile.accountInfo); // Store your agency info
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAgencies());
    dispatch(getAccountInfo()); // Fetch your agency info
  }, [dispatch]);

  const [selectedExpertise, setSelectedExpertise] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistanceRange, setSelectedDistanceRange] = useState("");
  const [filteredAgencies, setFilteredAgencies] = useState([]);
  const [selectedState, setSelectedState] = useState("");
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

  // Define 'temp' before using it
  const temp = agencies.allAgencies.agency;

  const filterAgenciesByExpertise = (expertise) => {
    if (expertise === "") {
      // If no expertise is selected, show all agencies or the ones filtered by search
      setFilteredAgencies(
        searchQuery === ""
          ? temp
          : temp.filter(
              (agency) =>
                agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                agency.email.toLowerCase().includes(searchQuery.toLowerCase())
              // Add more fields as needed for searching
            )
      );
    } else {
      // Filter agencies by expertise
      const filtered = temp.filter((agency) =>
        agency.expertise.includes(expertise)
      );
      setFilteredAgencies(filtered);
    }
  };

  const filterAgenciesByDistance = (distanceRange) => {
    const distances = {
      within10km: 10000, // 10 kilometers in meters
      within50km: 50000, // 50 kilometers in meters
      within100km: 100000, // 100 kilometers in meters
      within200km: 200000, // 200 kilometers in meters
    };

    if (distanceRange === ">200km") {
      // Filter agencies that are more than 200 kilometers away
      setFilteredAgencies(
        temp.filter((agency) => {
          const agencyCoordinates = {
            latitude: agency.location.coordinates[1],
            longitude: agency.location.coordinates[0],
          };
          const distance = geolib.getDistance(
            agencyCoordinates,
            yourAgencyCoordinates
          );
          return distance > distances["within200km"];
        })
      );
    } else {
      // Filter agencies within the selected distance range
      setFilteredAgencies(
        temp.filter((agency) => {
          const agencyCoordinates = {
            latitude: agency.location.coordinates[1],
            longitude: agency.location.coordinates[0],
          };
          const distance = geolib.getDistance(
            agencyCoordinates,
            yourAgencyCoordinates
          );
          return distance <= distances[distanceRange];
        })
      );
    }
  };

  const filterAgenciesByState = (state) => {
    if (state === "") {
      setFilteredAgencies(
        selectedExpertise === ""
          ? searchQuery === ""
            ? temp
            : temp.filter(
                (agency) =>
                  agency.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  agency.email.toLowerCase().includes(searchQuery.toLowerCase())
              )
          : temp.filter((agency) =>
              agency.expertise.includes(selectedExpertise)
            )
      );
    } else {
      const filtered = temp.filter((agency) =>
        agency.contact.address.state.toLowerCase().includes(state.toLowerCase())
      );
      setFilteredAgencies(filtered);
    }
  };

  useEffect(() => {
    filterAgenciesByExpertise(selectedExpertise);
  }, [selectedExpertise, searchQuery, temp]);

  useEffect(() => {
    if (selectedDistanceRange) {
      filterAgenciesByDistance(selectedDistanceRange);
    }
  }, [selectedDistanceRange, temp]);

  useEffect(() => {
    filterAgenciesByState(selectedState);
  }, [selectedState, temp]);

  if (agencies.loading || !temp || !agencyInfo) {
    return (
      <div className="spinner w-full flex items-center justify-center"></div>
    );
  }

  const allExpertise = agencies.allAgencies.agency.flatMap(
    (agency) => agency.expertise
  );
  const uniqueExpertise = [...new Set(allExpertise)];

  // Extract your agency's coordinates
  const yourAgencyCoordinates = {
    latitude: agencyInfo.location.coordinates[1],
    longitude: agencyInfo.location.coordinates[0],
  };

  return (
    <div className="w-full bg-gray-100 flex items-center gap-y-20 justify-center">
      <div className="w-full flex flex-col items-center gap-y-6 justify-center">
        <div className="overflow-hidden md:h-14 text-indigo-600 font-sans mt-6 text-4xl md:text-5xl font-bold">
          All Agencies List
        </div>
        {/* Filters and search */}
        <div className="w-11/12 flex flex-col items-center justify-center">
          {/* Search Bar */}
          <div className="w-full md:w-8/12 relative">
          <label className="block text-indigo-600 font-bold mb-2">Search:</label>
              <input
                type="text"
                placeholder="Search agencies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              />
              
            
          </div>

          <div className="flex w-8/12 md:flex-row sm:flex-col gap-x-12 mt-4 items-center justify-between">
            {/* Filters by expertise */}
            <div className="w-full">
              <div className="flex flex-col items-start">
                <div>
                  <label
                    htmlFor="expertiseFilter"
                    className="block text-indigo-600 font-bold mb-2"
                  >
                    Filter by Expertise:
                  </label>
                </div>
                <select
                  id="expertiseFilter"
                  value={selectedExpertise}
                  onChange={(e) => setSelectedExpertise(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">All</option>
                  {uniqueExpertise.map((expertise) => (
                    <option key={expertise} value={expertise}>
                      {expertise}
                    </option>
                  ))}
                </select>
                <div></div>
              </div>
            </div>

            {/* Distance filter */}
            <div className="w-full">
              <div className="flex flex-col items-start">
                <label
                  htmlFor="distanceFilter"
                  className="block text-indigo-600 font-bold mb-2"
                >
                  Filter by Distance:
                </label>
                <select
                  id="distanceFilter"
                  value={selectedDistanceRange}
                  onChange={(e) => setSelectedDistanceRange(e.target.value)}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Distance Range</option>
                  <option value="within10km">Within 10km</option>
                  <option value="within50km">Within 50km</option>
                  <option value="within100km">Within 100km</option>
                  <option value="within200km">Within 200km</option>
                  <option value=">200km">Greater than 200km</option>
                </select>
              </div>
            </div>

            {/* Filter by state */}
            <div className="w-full">
            <label className="block text-indigo-600 font-bold mb-2">State:</label>
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">All</option>
              {statesOfIndia.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          </div>
        </div>

        {/* Agencies */}
        <div className="w-full">
          {filteredAgencies &&
            filteredAgencies.map((agency) => (
              <AgencyComponent
                key={agency._id}
                agency={agency}
                coordinates={[
                  agency.location.coordinates[1],
                  agency.location.coordinates[0],
                ]}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Agencies;
