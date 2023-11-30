import React, { useEffect, useState } from "react";
import apiConnector from "../services/apiConnector";
import { disasterEndPoints } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const DisasterDetails = () => {
  // Redux state for account information
  const accountState = useSelector((state) => state.profile.accountInfo);

  // Local state for disaster details, agencies, and loading status
  const [disaster, setDisaster] = useState(null);
  const [agencies, setAgencies] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // React Router's navigate function and disasterId from URL params
  const navigate = useNavigate();
  const { disasterId } = useParams();

  // Function to handle the deletion of a disaster
  const handleDeleteDisaster = async () => {
    try {
      // Make an API call to delete the disaster (replace with your API endpoint)
      await apiConnector({
        method: "DELETE",
        url: `${disasterEndPoints.DELETE_DISASTER_API}/${disasterId}`,
      });

      // Display a success message and redirect to the disasters list
      toast.success("Disaster deleted successfully");
      navigate("/disasters");
    } catch (error) {
      toast.error("Error deleting disaster");
      console.error(error);
    }
  };

  // Fetch disaster and agency data when the component mounts
  useEffect(() => {
    // Fetch disaster details
    const fetchDisasterData = async () => {
      try {
        const disasterResponse = await apiConnector({
          method: "GET",
          url: `${disasterEndPoints.GET_DISASTER_API}/${disasterId}`,
        });

        setDisaster(disasterResponse.disaster);
        setLoadingData(false);
      } catch (error) {
        toast.error("Error fetching disaster details");
        console.error(error);
        setLoadingData(false);
      }
    };

    // Fetch agencies related to the disaster
    const fetchAgenciesData = async () => {
      try {
        const agencyResponse = await apiConnector({
          method: "GET",
          url: `${disasterEndPoints.FETCH_AGENCIES_FROM_DISASTER}/${disasterId}`,
        });

        setAgencies(agencyResponse);
      } catch (error) {
        toast.error("Error fetching agency details");
        console.error(error);
      }
    };

    fetchDisasterData();
    fetchAgenciesData();
  }, [disasterId]);

  return (
    <div className="sm:w-full md:w-11/12 mx-auto mt-4">
      <h1 className="md:text-4xl sm:text-2xl overflow-hidden font-bold text-center mb-4 text-indigo-600">
        Disaster Details
      </h1>
      {loadingData ? (
        <div className="w-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : disaster ? (
        <div className="bg-white shadow-2xl p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2 text-indigo-600">
            Disaster ID:
          </h2>
          <p className="font-bold text-gray-500 mt-2">{disasterId}</p>

          <h2 className="text-xl font-bold mb-2 mt-4 text-indigo-600">
            Severity:
          </h2>
          <p className="font-bold text-gray-500 mt-2">{disaster.severity}</p>

          <h2 className="text-xl font-bold mb-2 mt-4 text-indigo-600">
            Type of Disaster:
          </h2>
          <p className="font-bold text-gray-500 mt-2">
            {disaster.typeOfDisaster}
          </p>

          <h2 className="text-xl font-bold mb-2 mt-4 text-indigo-600">
            Description:
          </h2>
          <p className="font-bold text-gray-500 mt-2">{disaster.description}</p>

          <h2 className="text-xl font-bold mb-2 mt-4 text-indigo-600">
            Status:
          </h2>
          <p className="font-bold text-gray-500 mt-2">{disaster.status}</p>

          <h2 className="md:text-4xl md:h-12 sm:text-2xl overflow-hidden font-bold mt-4 text-indigo-600">
            Assisting Organizations
          </h2>
          {agencies.length === 0 ? (
            <p className="font-bold text-gray-500 mt-2">
              No agencies related to this disaster.
            </p>
          ) : (
            <ul>
              {agencies.map((agency) => (
                <li key={agency._id} className="font-bold text-gray-500 mt-2">
                  <div className="w-full">
                    Name of Agency :
                    <span className="text-lg font-Roborto text-indigo-500">
                      {agency.name}
                    </span>
                    <br></br>
                    Email:
                    <span className="text-lg text-indigo-500">
                      {agency.email}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="flex mt-6 flex-row gap-x-6 items-center">
            <div>
              {disaster.agencies[0] == accountState._id && (
                <button
                  onClick={() => handleDeleteDisaster()}
                  className="bg-red-500 hover:bg-red-600 transition-all duration-200 text-white font-bold py-2 px-4 rounded-full"
                >
                  Delete
                </button>
              )}
            </div>

            <div>
              {disaster.agencies[0] == accountState._id && (
                <button
                  onClick={() => navigate("update")}
                  className="bg-purple-500 hover:bg-purple-600 transition-all duration-200 text-white font-bold py-2 px-4 rounded-full"
                >
                  Update Disaster
                </button>
              )}
            </div>

            <div>
              <button
                onClick={() => navigate("/disasters")}
                className=" bg-purple-500 hover:bg-purple-600 transition-all duration-200 text-white font-bold py-2 px-4 rounded-full"
              >
                Back to Disasters
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-red-500">Disaster not found.</p>
          <button
            onClick={() => navigate("/disasters")}
            className="mt-6 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full"
          >
            Back to Disasters
          </button>
        </div>
      )}
    </div>
  );
};

export default DisasterDetails;
