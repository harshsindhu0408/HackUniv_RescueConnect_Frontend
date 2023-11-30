import React, { useState } from "react";
import apiConnector from "../services/apiConnector";
import { disasterEndPoints } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddDisaster = () => {
  const navigate = useNavigate();
  const [typeOfDisaster, setTypeOfDisaster] = useState("");
  const [severity, setSeverity] = useState("");
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the disaster data object
    const contactData = {
      address: {
        street,
        city,
        state,
        postalCode,
        country,
      },
    };
    const newDisaster = {
      typeOfDisaster,
      severity,
      status,
      contact: contactData,
      description,
    };
    console.log("New Disaster Data:", newDisaster);

    try {
      setLoading(true);

      // Make a POST request to add a new disaster
      const response = await apiConnector({
        method: "POST",
        url: disasterEndPoints.ADD_DISASTER_API,
        body: newDisaster,
      });

      setLoading(false);

      // Check the response status and show a toast accordingly
      toast.success("Disaster created successfully");
      // Navigate back to the list of disasters
      navigate("/disasters");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      // Handle error, e.g., show an error message
      console.error(error.response);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 min-h-screen">
      <div className="w-11/12 p-8">
        <h2 className="text-3xl overflow-hidden font-extrabold text-gray-900">
          Create a New Disaster
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
                value={typeOfDisaster}
                onChange={(e) => setTypeOfDisaster(e.target.value)}
              />
            </div>
          </div>

          {/* Status*/}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="typeOfDisaster" className="sr-only">
                Type of Disaster
              </label>
              <input
                id="status"
                name="status"
                type="text"
                autoComplete="status"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Status (Active/Inactive)"
                value={status}
                onChange={(e) => setStatus(e.target.value.toLocaleLowerCase())}
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

          {/* Street */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="street" className="sr-only">
                Street
              </label>
              <input
                id="street"
                name="street"
                type="text"
                autoComplete="street"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
          </div>

          {/* City */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="city" className="sr-only">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                autoComplete="city"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>

          {/* State */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="state" className="sr-only">
                State
              </label>
              <select
                id="state"
                name="contact.address.state" // Use nested structure
                autoComplete="state"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                onChange={(e) => setState(e.target.value)}
                value={state}
              >
                <option value="">Select State</option>
                {statesOfIndia.map((stateName) => (
                  <option key={stateName} value={stateName}>
                    {stateName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Postal Code */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="postalCode" className="sr-only">
                Postal Code
              </label>
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                autoComplete="postalCode"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </div>

          {/* Country */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="country" className="sr-only">
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                autoComplete="country"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
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
                Create Disaster
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

export default AddDisaster;
