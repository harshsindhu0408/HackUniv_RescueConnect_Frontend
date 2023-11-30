import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { resourceEndPoints } from "../services/api";
import apiConnector from "../services/apiConnector";

const AddResources = () => {
  // Define state variables for resource properties
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("");
  const [availability, setAvailability] = useState(true);
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a resource object with user inputs
    const newResource = {
      name,
      quantity,
      status,
      availability,
    };

    try {
      // Send a POST request to the API to create the resource
      const response = await apiConnector({
        method:'POST',
        url:resourceEndPoints.CREATE_RESOURCE_API,
        body:newResource,
      })
      console.log("API Response:", response);    
      toast.success("Resource created successfully");

      // Clear form inputs after successful submission
      setName("");
      setQuantity("");
      setStatus("");
      setAvailability(true);
      navigate("/resources");
    } catch (error) {
      // Handle errors and display an error message
      toast.error("Error creating resource");
      console.error("API Error:", error);
    }
  };

  return (
    <div className="mx-auto w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
      <h1 className="md:text-5xl sm:text-2xl overflow-hidden md:h-16 mt-10 text-center font-bold mb-4 text-indigo-600">Add Resource</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={name}
              placeholder="Name of Resource"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Quantity</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-md"
              value={quantity}
              placeholder="Quantity of resource"
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Status</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={status}
              placeholder="Available, In-Use, Under Repair"
              onChange={(e) => setStatus(e.target.value)}
              required
            />
          </div>
          {/* Availability */}
          <div className="rounded-md flex flex-row gap-x-6 shadow-sm mb-4">
            <label className="block text-sm font-semibold mb-2">Availability</label>
            <input
              type="checkbox"
              checked={availability}
              onChange={(e) => setAvailability(e.target.checked)}
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 transition-all duration-200 text-white font-semibold py-3 px-6 rounded-full w-full"
          >
            Create Resource
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddResources;
