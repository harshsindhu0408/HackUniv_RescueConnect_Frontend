import { AuthTypes } from "../action_types";
import apiConnector from "../../services/apiConnector";
import { agencyEndPoints } from "../../services/api";
import { toast } from "react-toastify";
import {getAccountInfo} from "./profileAction";

// Action to handle user login
export const authLogin = (user_data, navigate) => {
  return async (dispatch) => {
    try {
      // Dispatch the LOGIN_REQUEST action to indicate login request in progress
      dispatch({
        type: AuthTypes.LOGIN_REQUEST,
      });

      // Send a login request to the API
      const response = await apiConnector({
        method: "POST",
        url: agencyEndPoints.LOGIN_API,
        body: user_data,
      });

      // Assuming the API response contains a 'token' field
      const token = response.token;

      // Store the token in sessionStorage
      sessionStorage.setItem("_token", token);

      // Dispatch the LOGIN_SUCCESS action to update the Redux store
      dispatch({
        type: AuthTypes.LOGIN_SUCCESS,
        payload: { token }, // You can store additional user data in the payload if needed
      });

      dispatch(getAccountInfo());

      // Show a success toast
      toast.success("Login successfully!");

      // navigate to home
      navigate("/");
    } catch (error) {
      // Dispatch the LOGIN_FAILED action on error
      dispatch({
        type: AuthTypes.LOGIN_FAILED,
      });

      // Handle API errors and show an error toast
      toast.error(error.response.data.message);
    }
  };
};

// Action to handle user registration
export const authRegister = (user_data, navigate) => {
  return async (dispatch) => {
    try {
      // Dispatch the SIGNUP_REQUEST action to indicate register request in progress
      dispatch({
        type: AuthTypes.SIGNUP_REQUEST,
      });

      // Send a register request to the API
      await apiConnector({
        method: "POST",
        url: agencyEndPoints.REGISTER_API,
        body: user_data,
      });

      // Dispatch the SIGNUP_SUCCESS action to update the Redux store
      dispatch({
        type: AuthTypes.SIGNUP_SUCCESS,
      });

      // Show a success toast
      toast.success("Successfully registered!");

      // navigate to login page
      navigate("/login");
    } catch (error) {
      // Dispatch the SIGNUP_FAILED action on error
      dispatch({
        type: AuthTypes.SIGNUP_FAILED,
      });

      // Handle API errors and show an error toast
      toast.error(error.response.data.message);
    }
  };
};

export const updatePassword = (passwordData) => {
  return async (dispatch) => {
    try {
      // Dispatch the UPDATE_PASSWORD_REQUEST action to indicate password update request in progress
      dispatch({
        type: AuthTypes.UPDATE_PASSWORD_REQUEST,
      });

      // Send a request to update the password (replace with your API endpoint)
      await apiConnector({
        method: "PUT",
        url: agencyEndPoints.UPDATE_PASSWORD_API, // Replace with the actual endpoint for updating the password
        body: passwordData,
      });

      // Dispatch the UPDATE_PASSWORD_SUCCESS action to indicate successful password update
      dispatch({
        type: AuthTypes.UPDATE_PASSWORD_SUCCESS,
      });

      // Show a success toast
      toast.success("Password updated successfully!");
    } catch (error) {
      // Dispatch the UPDATE_PASSWORD_FAILED action on error
      dispatch({
        type: AuthTypes.UPDATE_PASSWORD_FAILED,
      });

      // Handle API errors and show an error toast
      toast.error(error.response.data.message);
    }
  };
};

// Action to handle user logout
export const authLogout = () => {
  return (dispatch) => {
    // Remove the token from sessionStorage
    sessionStorage.removeItem("_token");

    // Dispatch the LOGOUT action to update the Redux store
    dispatch({
      type: AuthTypes.LOGOUT,
    });

    // Show a success toast
    toast.success("Logged out");
  };
};
