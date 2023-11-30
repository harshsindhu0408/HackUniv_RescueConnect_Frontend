// DisasterComponent.js

import React from "react";
import { useNavigate } from "react-router-dom";

const DisasterComponent = ({ disaster }) => {
  const navigate = useNavigate();

  // Check if disaster data is not available or is undefined
  if (!disaster) {
    return (
      <div className="spinner w-full flex items-center justify-center"></div>
    );
  }

  // Extract address data, handling possible undefined values
  const address = disaster.contact?.address || {};
  const street = address.street || "";
  const city = address.city || "";
  const state = address.state || "";
  const country = address.country || "";

  const handleDetailsClick = (disasterId) => {
    // Navigate to the disaster details page with the disaster ID as a param
    navigate(`/disaster/${disasterId}`);
  };

  return (
    <div className="bg-white border-2 shadow-md p-4 rounded-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg">
      <h3 className="text-2xl font-bold text-blue-800">{disaster.typeOfDisaster}</h3>
      <p className="text-sm font-bold text-gray-500 mt-2">Date - {disaster.timestamp}</p>
      <p className="text-sm font-bold text-gray-500">Severity level: {disaster.severity}</p>
      <p className="text-sm font-bold text-gray-500">Description: {disaster.description}</p>
      <div className="mt-4">
        <p className="text-sm font-bold text-gray-500">Address:</p>
        <p className="text-sm font-bold text-gray-500">{street}</p>
        <p className="text-sm font-bold text-gray-500">{`${city}, ${state}`}</p>
        <p className="text-sm font-bold text-gray-500">{country}</p>
      </div>
      <button
        className="mt-4 bg-indigo-500 hover:bg-indigo-600 w-full text-white font-semibold py-2 px-4 rounded-full transition-all duration-200"
        onClick={() => handleDetailsClick(disaster._id)}
      >
        Details
      </button>
    </div>
  );
};

export default DisasterComponent;
