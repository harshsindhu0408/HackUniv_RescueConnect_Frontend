// profileAction.js

import { AgencyTypes } from "../action_types";
import apiConnector from "../../services/apiConnector";
import { agencyEndPoints } from "../../services/api";
import { toast } from "react-toastify";

// Action to request a specific agency profile
export const getSpecificAgencyProfile = (agencyId) => {
  return async (dispatch) => {
    try {
      // Dispatch the GET_SPECIFIC_AGENCY_REQUEST action to indicate the request in progress
      dispatch({ type: AgencyTypes.GET_SPECIFIC_AGENCY_REQUEST });

      // Make an API request to fetch the specific agency profile
      const response = await apiConnector({
        method: "GET",
        url: `${agencyEndPoints.GET_SPECIFIC_AGENCY_PROFILE}/${agencyId}`,
      });

      // Dispatch the GET_SPECIFIC_AGENCY_SUCCESS action with the received agency data
      dispatch({
        type: AgencyTypes.GET_SPECIFIC_AGENCY_SUCCESS,
        payload: response, // Modify this based on your API response structure
      });
      console.log("response ->>>>>>>>>>>", response);
    } catch (error) {
      // Dispatch the GET_SPECIFIC_AGENCY_FAILURE action on error
      dispatch({ type: AgencyTypes.GET_SPECIFIC_AGENCY_FAILURE });

      // Handle API errors and show an error toast
      toast.error(error.response.data.message);
    }
  };
};

// Action to request all agencies
export const getAllAgencies = () => {
  return async (dispatch) => {
    try {
      // Dispatch the GET_ALL_AGENCIES_REQUEST action to indicate the request in progress
      dispatch({ type: AgencyTypes.GET_ALL_AGENCIES_REQUEST });

      // Make an API request to fetch all agencies
      const response = await apiConnector({
        method: "GET",
        url: agencyEndPoints.GET_ALL_AGENCIES,
      });
      console.log("Response data ->", response);
      // Dispatch the GET_ALL_AGENCIES_SUCCESS action with the received agency data
      dispatch({
        type: AgencyTypes.GET_ALL_AGENCIES_SUCCESS,
        payload: response, // Modify this based on your API response structure
      });
    } catch (error) {
      // Dispatch the GET_ALL_AGENCIES_FAILURE action on error
      dispatch({ type: AgencyTypes.GET_ALL_AGENCIES_FAILURE });

      // Handle API errors and show an error toast
      toast.error(error.response.message);
    }
  };
};
