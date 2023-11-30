// Import necessary dependencies
import axios from "axios";
import { toast } from "react-toastify";

// Create an async function for making API requests
const apiConnector = async function ({
  method = "get", // HTTP request method (default is GET)
  url, // URL for the API endpoint
  body = null, // Request body data (default is null)
  headers = null, // Custom headers for the request (default is null)
}) {
  // Check if a JWT token is stored in sessionStorage and set it as a default header
  if (sessionStorage.getItem("_token")) {
    if (headers) {
      headers += {
        Authorization: sessionStorage.getItem("_token"),
      };
    } else {
      headers = {
        Authorization: sessionStorage.getItem("_token"),
      };
    }
  }

  try {
    // Make the API request using Axios
    const response = await axios({
      method: method,
      url: url,
      data: body,
      headers: headers,
    });
    return response.data; // Return the response data
  } catch (error) {
    if (error.response) {
      // Handle the case where the server responded with an error status code
      console.log("Response data:", error.response.data);
      console.log("Response status:", error.response.status);
    } else if (error.request) {
      // Handle the case where the request was made but no response was received
      console.log("No response received. Network error.");
      toast.error("Network error occurred.");
    } else {
      // Handle other types of errors
      console.error("Error:", error.message);
    }

    // Create a custom error object to propagate the error information
    const customError = new Error("API call failed");
    customError.response = {
      data: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    };
    throw customError; // Throw the custom error to indicate API call failure
  }
};

export default apiConnector; // Export the API connector function
