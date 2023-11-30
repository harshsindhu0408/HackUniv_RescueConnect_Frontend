import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiConnector from "../services/apiConnector";
import { resourceEndPoints } from "../services/api";
import { toast } from "react-toastify";
import bgimg from '../assets/update disaster.png';

const UpdateResource = () => {
  const { resourceId } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    status: "",
    availability: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await apiConnector({
          method: "GET",
          url: `${resourceEndPoints.GET_RESOURCE_API}/${resourceId}`,
        });

        setResource(response.resource);
        setFormData({
          name: response.resource.name,
          quantity: response.resource.quantity,
          status: response.resource.status,
          availability: response.resource.availability,
        });
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching Resource details");
        console.error(error);
        setLoading(false);
      }
    };

    fetchResource();
  }, [resourceId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await apiConnector({
        method: "PUT",
        url: `${resourceEndPoints.UPDATE_RESOURCE_API}/${resourceId}`,
        body: formData,
      });

      setLoading(false);

      toast.success("Resource updated successfully");
      navigate("/resources");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.error(error.response);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 min-h-screen">
      <div className="w-11/12 flex flex-col items-center justify-center lg:flex-row xl:flex-row 2xl:flex-row sm:flex-col flex-wrap">
        {/* Left Section (Update Form) */}
        <div className="lg:w-7/12 sm:w-full p-8">
          <h2 className="md:text-6xl sm:w-full sm:text-4xl overflow-hidden font-extrabold md:h-20 text-indigo-600 text-center">
            Update Resource Info
          </h2>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Quantity */}
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="quantity" className="sr-only">
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  autoComplete="quantity"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Status */}
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="status" className="sr-only">
                  Status
                </label>
                <input
                  id="status"
                  name="status"
                  type="text"
                  autoComplete="status"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Status"
                  value={formData.status}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Availability */}
            <div className="rounded-md flex flex-row gap-x-6 shadow-sm">
              <label className="block text-sm font-semibold mb-2">Availability</label>
              <input
                type="checkbox"
                id="availability"
                name="availability"
                checked={formData.availability}
                onChange={(e) =>
                  setFormData({ ...formData, availability: e.target.checked })
                }
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>

            <div className="text-center w-full">
              <button
                type="submit"
                className="bg-indigo-500 w-full hover:bg-indigo-600 transition-all duration-200 text-white font-semibold py-2 px-4 rounded-full"
              >
                Update Resource
              </button>
            </div>
          </form>
        </div>

        {/* Right Section (Image) */}
        <div className="lg:w-5/12 sm:hidden md:block flex items-center justify-center">
          <img
            src={bgimg}
            alt="Resource"
            className="object-cover ml-10 object-center sm:h-auto"
            width="600px"
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateResource;
