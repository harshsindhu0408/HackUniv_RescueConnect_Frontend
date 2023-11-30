import React, { useEffect, useState } from "react";
import apiConnector from "../services/apiConnector";
import { alertEndPoints } from "../services/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import AlertComponent from "../components/AlertComponent";

const Alert = () => {
  const [receivedAlerts, setReceivedAlerts] = useState([]);
  const [sentAlerts, setSentAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiConnector({
          method: "GET",
          url: alertEndPoints.GET_AGENCY_ALERTS_API,
        });

        // Assuming the response structure has "receivedAlerts" and "sentAlerts" arrays
        const { receivedAlerts, sentAlerts } = response;

        setReceivedAlerts(receivedAlerts);
        // Replace sender agency with recipient agency for "sent" alerts
        const modifiedSentAlerts = sentAlerts.map((alert) => ({
          ...alert,
          senderAgency: alert.recipientAgency,
        }));
        setSentAlerts(modifiedSentAlerts);

        setLoading(false);
      } catch (error) {
        toast.error("Error fetching alerts");
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-11/12 md:w-3/4 lg:w-2/3 flex flex-col items-center justify-center">
        <h2 className="text-3xl overflow-hidden md:h-16 sm:text-4xl md:text-5xl text-center mt-6 font-bold mb-6 text-indigo-600">
          Alerts Section
        </h2>

        {/* Create Alert */}
        <div className="w-6/12">
          <Link to="/createAlert">
            <button className="bg-indigo-500 w-full hover:bg-indigo-600 transition-all duration-200 text-white font-semibold py-2 px-4 rounded-full">
              Send Alert To Other Agencies
            </button>
          </Link>
        </div>

        {/* Received Alerts Section */}
        <div className="w-full">
          <div className="overflow-hidden text-center md:h-14 text-indigo-600 font-sans mt-6 text-4xl font-bold">
            Received Alerts
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {receivedAlerts.map((alert) => (
              <div className="w-full" key={alert._id}>
                <AlertComponent alert={alert} />
              </div>
            ))}
          </div>
        </div>

        {/* Sent Alerts Section */}
        <div className="w-full">
          <div className="overflow-hidden text-center md:h-14 text-indigo-600 font-sans mt-6 text-4xl font-bold">
            Sent Alerts
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {sentAlerts.map((alert) => (
              <div className="w-full" key={alert._id}>
                <AlertComponent alert={alert} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Alert;
