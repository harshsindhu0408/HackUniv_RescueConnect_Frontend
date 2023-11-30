import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import apiConnector from "../services/apiConnector";
import { resourceEndPoints } from "../services/api";
import { useSelector } from "react-redux";

const ResourceDetails = () => {
  const { resourceId } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const state = useSelector((state) => state.profile);
  const agency = useSelector((state) => state.profile.accountInfo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiConnector({
          method: "GET",
          url: `${resourceEndPoints.GET_RESOURCE_API}/${resourceId}`,
        });

        setResource(response.resource);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching resource");
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [resourceId]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (state.loading || !agency || loading || !resource) {
    return (
      <div className="w-full flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="md:w-8/12 sm:w-full mx-auto p-4">
      <h1 className="font-bold overflow-hidden text-indigo-500 text-4xl sm:text-3xl mb-4">
        Resource Details
      </h1>
      <div className="border rounded-lg p-4">
        <p className="mb-2">
          <span className="font-semibold">Name:</span> {resource.name}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Quantity:</span> {resource.quantity}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Status:</span> {resource.status}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Owner Agency:</span> {agency.name}
        </p>
        <p className="mb-2 sm:w-8/12 md:w-full">
          <span className="font-semibold">Owner Agency Email:</span>{" "}
          <span className="break-all">{agency.email}</span>
        </p>
        <p
          className={`mb-2 text-${resource.availability ? "green" : "red"}-500`}
        >
          Availability: {resource.availability ? "Available" : "Not Available"}
        </p>
      </div>

      {resource.sharedWith.length > 0 && (
        <div className="mt-4 border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Shared With Agencies</h2>
          <ul>
            {resource.sharedWith.map((sharedAgency, index) => (
              <li key={index}>{sharedAgency.name}</li>
            ))}
          </ul>
        </div>
      )}

      <Link
        to="/resources"
        className="bg-blue-500 mt-4 w-full md:w-2/12 hover:bg-blue-600
       text-white font-semibold py-2 px-4 rounded-full transition-transform
        hover:scale-105 flex items-center justify-center"
      >
        Back to Resources
      </Link>
    </div>
  );
};

export default ResourceDetails;
