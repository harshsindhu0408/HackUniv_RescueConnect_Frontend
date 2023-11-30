import { ProfileTypes } from "../action_types";
import apiConnector from "../../services/apiConnector";
import { agencyEndPoints } from "../../services/api"; // Replace with your actual API endpoints
import { toast } from "react-toastify";

// Action to request account information
export const getAccountInfo = () => {
  return async (dispatch) => {
    try {
      // Dispatch the ACCOUNT_REQUEST action to indicate the request in progress
      dispatch({
        type: ProfileTypes.GET_ACCOUNT_REQUEST,
      });

      // Make an API request to fetch the account information
      const response = await apiConnector({
        method: "GET",
        url: agencyEndPoints.GET_AGENCY_PROFILE, // Replace with the actual endpoint
      });

      // Dispatch the ACCOUNT_SUCCESS action with the received account data
      dispatch({
        type: ProfileTypes.GET_ACCOUNT_SUCCESS,
        payload: response.agency, // You can modify this based on your API response structure
      });
    } catch (error) {
      // Handle API errors and show an error toast
      toast.error(error.response.data.message);
    }
  };
};

// Action to update account information
export const updateAccountInfo = (updatedInfo,navigate) => {
  return async (dispatch) => {
    try {
      // Dispatch the ACCOUNT_REQUEST action to indicate the request in progress
      dispatch({
        type: ProfileTypes.UPDATE_ACCOUNT_REQUEST,
      });

      // Make an API request to update the account information
      const response = await apiConnector({
        method: "PUT",
        url: agencyEndPoints.UPDATE_AGENCY_INFO_API, // Replace with the actual endpoint
        body: updatedInfo,
      });

      // Dispatch the ACCOUNT_SUCCESS action with the updated account data
      dispatch({
        type: ProfileTypes.UPDATE_ACCOUNT_SUCCESS,
        payload: response.updatedAgency
        , // You can modify this based on your API response structure
      });

      // Show a success toast
      toast.success("Account information updated successfully!");
      navigate('/profile')
    } catch (error) {
      // Handle API errors and show an error toast
      toast.error(error.response.data.message);
    }
  };
};
