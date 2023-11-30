import React, { useEffect, useState } from "react";
import apiConnector from "../services/apiConnector";
import { alertEndPoints } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllAgencies } from "../redux/Actions/agencyAction";

const AddAlert = () => {
  const agencies = useSelector((state) => state.agencies.allAgencies.agency);
  const dispatch = useDispatch();
  
  const state = useSelector((state) => state.profile);
  
 

  useEffect(() => {
    dispatch(getAllAgencies());
  }, [dispatch]);

  const navigate = useNavigate();
  const [recipientAgency, setRecipientAgency] = useState("");
  const [severity, setSeverity] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create the Alert data object
    const newAlert = {
      recipientAgency,
      severity,
      description,
    };
    console.log("New Alert Data:", newAlert);

    try {
      setLoading(true);

      // Make a POST request to add a new disaster
      const response = await apiConnector({
        method: "POST",
        url: alertEndPoints.CREATE_ALERT_API,
        body: newAlert,
      });
      setLoading(false);
      toast.success("Alert created successfully");
      navigate("/alert");
    } catch (error) {
      setLoading(false);
      toast.error(error);
      console.error(error.response);
    }
  };

  if (!agencies) {
    return (
      <div className="spinner w-full flex items-center justify-center"></div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 min-h-screen">
      <div className="w-11/12 p-8">
        <h2 className="text-3xl overflow-hidden font-extrabold text-gray-900">
          Create a New Alert
          {console.log("agencies", agencies)}
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Create alert */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="typeOfDisaster" className="sr-only">
                Sender agency
              </label>
              <select
                id="recipientAgency"
                name="recipientAgency"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={recipientAgency}
                onChange={(e) => setRecipientAgency(e.target.value)}
              >
                <option value="">Select Recipient Agency</option>
                {agencies.map((agency) => (
                  <option key={agency._id} value={agency._id}>
                    {agency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Severity */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="severity" className="sr-only">
                Severity
              </label>
              <input
                id="severity"
                name="severity"
                type="text"
                autoComplete="severity"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Severity (High / Low)"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
              />
            </div>
          </div>

          {/* Description */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="description" className="sr-only">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                autoComplete="description"
                required
                rows="4"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            {!loading ? (
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border
                   border-transparent text-sm font-medium rounded-md text-white
                    bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2
                     focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                Send Alert
              </button>
            ) : (
              <div className="spinner w-full flex items-center justify-center"></div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAlert;
