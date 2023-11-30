import React, { useState, useEffect } from "react";
import apiConnector from "../services/apiConnector";
import { disasterEndPoints } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import bgimg from '../assets/update disaster.png'

const UpdateDisaster = () => {
  const navigate = useNavigate();
  const { disasterId } = useParams();
  const [disaster, setDisaster] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDisaster = async () => {
      try {
        const response = await apiConnector({
          method: "GET",
          url: `${disasterEndPoints.GET_DISASTER_API}/${disasterId}`,
        });

        setDisaster(response.disaster);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching disaster details");
        console.error(error);
        setLoading(false);
      }
    };

    fetchDisaster();
  }, [disasterId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Make a PUT request to update the disaster
      const response = await apiConnector({
        method: "PUT",
        url: `${disasterEndPoints.UPDATE_DISASTER_API}/${disasterId}`,
        body: disaster,
      });

      setLoading(false);

      // Check the response status and show a toast accordingly
      toast.success("Disaster updated successfully");
      navigate("/disasters"); // Redirect to the list of disasters
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.error(error.response);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDisaster({ ...disaster, [name]: value });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 min-h-screen">
      <div className="w-11/12 flex flex-col items-center justify-center lg:flex-row xl:flex-row 2xl:flex-row sm:flex-col flex-wrap">
        {/* Left Section (Update Form) */}
        <div className="lg:w-7/12  sm:w-full p-8">
          <h2 className="md:text-6xl sm:text-2xl overflow-hidden font-extrabold md:h-20 text-indigo-600 text-center">
            Update Disaster Info
          </h2>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Type of Disaster */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="typeOfDisaster" className="sr-only">
                  Type of Disaster
                </label>
                <input
                  id="typeOfDisaster"
                  name="typeOfDisaster"
                  type="text"
                  autoComplete="typeOfDisaster"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Type of Disaster"
                  value={disaster.typeOfDisaster}
                  onChange={handleChange}
                />
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
                  placeholder="Severity"
                  value={disaster.severity}
                  onChange={handleChange}
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Description"
                  value={disaster.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Other fields */}
            {/* Add more input fields for other disaster properties as needed */}

            <div className="text-center w-full">
              <button
                type="submit"
                className="bg-indigo-500 w-full hover:bg-indigo-600 transition-all duration-200 text-white font-semibold py-2 px-4 rounded-full"
              >
                Update Disaster
              </button>
            </div>
          </form>
        </div>

        {/* Right Section (Image) */}
        <div className="lg:w-5/12  sm:hidden md:block flex items-center justify-center">
          <img
            src={bgimg} // Replace with the actual image path
            alt="Agency"
            width="600px"
            className="object-cover ml-10 object-center sm:h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateDisaster;
