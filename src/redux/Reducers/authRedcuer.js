import { AuthTypes } from "../action_types";

// Define the initial state for the authentication reducer
const initialState = {
  loading: false, // Indicates whether an authentication request is in progress
  isLoggedin: false, // Indicates whether the user is logged in
  token: null, // Stores the authentication token (e.g., JWT)
};

// Define the authentication reducer function
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Start loading when login, signup, or password update request is made
    case AuthTypes.LOGIN_REQUEST:
    case AuthTypes.SIGNUP_REQUEST:
    case AuthTypes.UPDATE_PASSWORD_REQUEST:
      return { ...state, loading: true };

    // Update state when login is successful
    case AuthTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedin: true,
        token: action.payload, // Set the authentication token from the action payload
      };

    // Handle login, signup, password update failures, and logout by stopping loading
    case AuthTypes.SIGNUP_SUCCESS:
    case AuthTypes.UPDATE_PASSWORD_FAILED:
    case AuthTypes.UPDATE_PASSWORD_SUCCESS:
      return { ...state, loading: false };
    case AuthTypes.SIGNUP_FAILED:
    case AuthTypes.LOGIN_FAILED:
    case AuthTypes.LOGOUT:
      return { ...initialState, loading: false };

    // Default case: return the current state if action type is not recognized
    default:
      return state;
  }
};

export default authReducer;
