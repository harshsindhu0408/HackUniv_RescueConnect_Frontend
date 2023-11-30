import React, { useEffect, useState } from "react";
import { agencyEndPoints } from "../services/api";
import apiConnector from "../services/apiConnector";
import { Link } from "react-router-dom";

const AlertComponent = ({ alert }) => {
  const [senderAgencyDetails, setSenderAgencyDetails] = useState(null);

  useEffect(() => {
    // Replace this with your function to fetch agency details by ID
    const fetchAgencyDetails = async () => {
      try {
        const response = await apiConnector({
          method: "GET",
          url:
            agencyEndPoints.GET_SPECIFIC_AGENCY_PROFILE +
            "/" +
            alert.senderAgency,
        });

        setSenderAgencyDetails(response.agency); // Set the agency details in state
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch agency details when the component mounts
    fetchAgencyDetails();
  }, [alert.senderAgency]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 font-semibold">
      <h1 className="text-xl sm:text-2xl font-semibold text-blue-500 mb-2">
        {senderAgencyDetails ? senderAgencyDetails.name : "Loading..."}
      </h1>
      <p className="text-gray-700">Desc: {alert.description}</p>
      <p className="text-gray-700 mt-2">Severity: {alert.severity}</p>
      <p className="text-gray-700 mt-2">
        Timestamp: {new Date(alert.timestamp).toLocaleString()}
      </p>
      <p className="text-gray-700 mt-2">
        Agency name:{" "}
        {senderAgencyDetails ? senderAgencyDetails.name : "Loading..."}
      </p>
      <p className="text-gray-700 mt-2">
        Contact Email:{" "}
        {senderAgencyDetails ? senderAgencyDetails.email : "Loading..."}
      </p>

      <div className="mt-4">
        {senderAgencyDetails && (
          <Link
            className="w-full"
            to={`/agency-profile/${senderAgencyDetails._id}`}
          >
            <button className="bg-indigo-500 w-full hover:bg-indigo-600 hover:scale-95 text-white shadow-sm rounded-full px-4 py-2 duration-300">
              Agency Profile
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AlertComponent;
