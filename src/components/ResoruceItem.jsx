import React from "react";
import { toast } from "react-toastify";
import apiConnector from "../services/apiConnector";
import { resourceEndPoints } from "../services/api";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function ResoruceItem({ resource, onDelete }) {
  const accountState = useSelector((state) => state.profile.accountInfo);
  const navigate = useNavigate();

  const deleteResource = async (resourceId) => {
    try {
      // Make an API call to delete the resource using the resource ID
      await apiConnector({
        method: "DELETE",
        url: `${resourceEndPoints.DELETE_RESOURCES_API}/${resourceId}`,
      });

      // After successful deletion, call the onDelete function passed as a prop
      // to remove the deleted resource from the parent component's state.
      onDelete(resourceId);

      toast.success("Resource deleted successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h3 className="text-xl font-semibold text-indigo-700">{resource.name}</h3>
      <div className="text-gray-600">
        <p>Status: {resource.status}</p>
        <p>Quantity: {resource.quantity}</p>
        <p className={`text-${resource.availability ? "green" : "red"}-500`}>
          Availability: {resource.availability ? "Available" : "Not Available"}
        </p>
      </div>

      <div className="flex w-full items-center justify-start overflow-hidden space-x-4">
        {resource.ownerAgency === accountState._id && (
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition-all duration-200"
            onClick={() => deleteResource(resource._id)}
          >
            Delete
          </button>
        )}

        {resource.ownerAgency === accountState._id && (
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full transition-all duration-200"
            onClick={() => navigate(`/updateResource/${resource._id}`)}
          >
            Update
          </button>
        )}

        <Link
          to={`/resource/${resource._id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-all duration-200 flex items-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
