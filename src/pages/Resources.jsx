import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import ResoruceItem from "../components/ResoruceItem";
import apiConnector from "../services/apiConnector";
import { resourceEndPoints } from "../services/api";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]); // Define filteredResources state
  const [loading, setLoading] = useState(true);
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [quantityFilter, setQuantityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiConnector({
          method: "GET",
          url: resourceEndPoints.LIST_RESOURCES_API,
        });

        setResources(response.resources);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching resources");
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = resources;

    if (availabilityFilter !== "all") {
      filtered = filtered.filter(
        (resource) => resource.availability === (availabilityFilter === "yes")
      );
    }

    if (quantityFilter) {
      filtered = filtered.filter(
        (resource) => parseInt(resource.quantity) >= parseInt(quantityFilter)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((resource) =>
        resource.status.toLowerCase().includes(statusFilter.toLowerCase())
      );
    }

    setFilteredResources(filtered);
  }, [availabilityFilter, quantityFilter, statusFilter, resources]);

  const allStatuses = Array.from(
    new Set(resources.map((resource) => resource.status))
  );

  const handleDetailsClick = (resourceId) => {
    navigate(`/resource-details/${resourceId}`);
  };

  const handleDeleteResource = (resourceId) => {
    // Remove the deleted resource from the resources state
    setResources((prevResources) =>
      prevResources.filter((resource) => resource._id !== resourceId)
    );
  };

  if (loading) {
    return (
      <div className="spinner w-full flex items-center justify-center"></div>
    );
  }

  return (
    <div className="w-11/12 mx-auto p-4">
      <div className="mb-4">
        <h2 className="md:text-5xl sm:text-2xl overflow-hidden md:h-16 text-center font-bold text-indigo-600">
          Resource Inventory
        </h2>
      </div>
      <div className="flex justify-center gap-x-16 items-center mb-4">
        <Link className="w-6/12" to="/addResource">
          <button className="bg-indigo-500 w-full hover:bg-indigo-600 transition-all duration-200 text-white font-semibold py-2 px-4 rounded-full">
            Add Resource
          </button>
        </Link>
      </div>

      <div className="flex items-center justify-center flex-col mb-6">
        <div className="w-8/12 mt-6 mb-4">
          <label className="block text-indigo-600 font-bold mb-2">
            Search:
          </label>
          <input
            type="text"
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Search any Resource...."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-8/12 gap-x-6 flex justify-between">
          <div className="w-1/3">
            <label className="block text-indigo-600 font-bold mb-2">
              Availability:
            </label>
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setAvailabilityFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="w-1/3">
            <label className="block text-indigo-600 font-bold mb-2">
              Quantity:
            </label>
            <input
              type="number"
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Minimum Quantity"
              onChange={(e) => setQuantityFilter(e.target.value)}
            />
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
              {allStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredResources
          .filter((resource) =>
            resource.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((resource) => (
            <ResoruceItem key={resource._id} resource={resource} onDelete={handleDeleteResource}/>
          ))}
      </div>
    </div>
  );
};

export default Resources;
